import { hash } from 'bcrypt';
import * as crypto from 'crypto';
import { HttpException } from '@/exceptions/httpException';
import { Creator } from '@/interfaces/creator.interface';
import { CreatorModel } from '@/models/creator.model';
import { Service } from 'typedi';

import axios from 'axios';
import { PROXY_API_KEY, PROXY_URL } from '@config';
import mongoose from 'mongoose';

@Service()
export class CreatorService {
  // get all creators
  public async getCreators(): Promise<Creator[]> {
    const creators: Creator[] = await CreatorModel.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'assignEmployee',
          foreignField: '_id',
          as: 'assignEmployee',
        },
      },
      {
        $project: {
          creatorName: 1,
          creatorImage: 1,
          status: 1,
          'assignEmployee.name': 1,
          'assignEmployee._id': 1,
          isLinkOnlyFans: 1,
          gender: 1,
          internalNotes: 1,
          autoRelink: 1,
          proxy: 1,
          agencyId: 1,
          email: 1,
          password: 1,
          sessionBucket: 1,
          ofcreds: 1,
        },
      },
    ]);
    return creators;
  }

  public async createCreator(creatorData: Creator) {
    //TODO: Check if employee assigned exist
    try {
      // const hashedPassword = await hash(creatorData.ofcreds.password, 10);
      (creatorData.autoRelink = creatorData.autoRelink === 'true' ? true : false),
        (creatorData.status = creatorData.status === 'true' ? true : false),
        (creatorData.ofcreds = JSON.parse(creatorData.ofcreds));
      creatorData.assignEmployee = JSON.parse(creatorData.assignEmployee);
      const createdCreator: Creator = await CreatorModel.create({
        agencyId: creatorData.agencyId,
        creatorName: creatorData.creatorName,
        creatorImage: creatorData.creatorImage,
        gender: creatorData.gender,
        internalNotes: creatorData.internalNotes,
        autoRelink: creatorData.autoRelink,
        status: creatorData.status,
        ofcreds: {
          email: creatorData.ofcreds.email,
          password: creatorData.ofcreds.password,
        },
        assignEmployee: creatorData.assignEmployee,
      });
      return createdCreator;
      // const createdCreator = new CreatorModel(creatorData);

      // return await createdCreator.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  // delete a creator by an admin
  public async deleteCreator(creatorId: string): Promise<Creator> {
    const deleteCreatorById: Creator = await CreatorModel.findByIdAndDelete(creatorId);
    if (!deleteCreatorById) throw new HttpException(409, "User doesn't exist");

    return deleteCreatorById;
  }
  public async getCreator(creatorId: string): Promise<Creator> {
    const getCreator: Creator = await CreatorModel.findById(creatorId);
    if (!getCreator) throw new HttpException(404, 'Creator Not Found');

    return getCreator;
  }

  // get a creator by id
  public async getCreatorById(creatorId: string): Promise<Creator> {
    const findCreator: Creator = await CreatorModel.findById(creatorId);
    if (!findCreator) throw new HttpException(409, "User doesn't exist");

    return findCreator;
  }

  // update a creator by id
  public async updateCreator(creatorId: string, creatorData: Creator): Promise<Creator> {
    const updateCreatorById: Creator = await CreatorModel.findByIdAndUpdate(
      {
        _id: creatorId,
      },
      {
        $set: creatorData,
      },
      {
        new: true,
      },
    );
    if (!updateCreatorById) throw new HttpException(409, "User doesn't exist");

    return updateCreatorById;
  }

  public async assignCreatorToEmployee(creatorIds: any, employeeId: any): Promise<Creator[]> {
    try {
      const updatedCreators: Creator[] = [];

      for (const creatorId of creatorIds) {
        const creator = await CreatorModel.findById(creatorId);

        if (!creator) {
          throw new Error(`Creator with ID ${creatorId} not found.`);
        }

        if (creator.assignEmployee?.includes(employeeId)) {
          throw new Error(`Employee with ID ${employeeId} is already assigned to Creator with ID ${creatorId}.`);
        }

        creator.assignEmployee.push(employeeId);
        const updatedCreator = await creator.save();
        updatedCreators.push(updatedCreator);
      }

      return updatedCreators;
    } catch (error) {
      throw error;
    }
  }

  public async searchCreator(getData: any) {
    const filter: any = {};
    if (getData.creator) {
      filter.creatorName = new RegExp(getData.creator, 'i');
    }

    if (getData.status) {
      getData.status = Boolean(getData.status === 'true' ? true : false);
      filter.status = getData.status;
    }

    if (getData.isLinkOnlyFans) {
      getData.isLinkOnlyFans = Boolean(getData.isLinkOnlyFans === 'true' ? true : false);
      filter.isLinkOnlyFans = getData.isLinkOnlyFans;
    }

    if (getData.employeeId) {
      const employeId = new mongoose.Types.ObjectId(getData.employeeId);
      filter.assignEmployee = { $in: [employeId] };
    }

    if (getData.agencyId) {
      const agencyId = new mongoose.Types.ObjectId(getData.agencyId);
      filter.agencyId = { $in: [agencyId] };
    }
    const creator = await CreatorModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'employees',
          localField: 'assignEmployee',
          foreignField: '_id',
          as: 'assignEmployee',
        },
      },
      {
        $project: {
          _id: 1,
          creatorName: 1,
          status: 1,
          'assignEmployee.name': 1,
          'assignEmployee._id': 1,
          isLinkOnlyFans: 1,
          gender: 1,
          internalNotes: 1,
          autoRelink: 1,
          proxy: 1,
          agencyId: 1,
          email: {
            $cond: [{ $eq: ['$ofcreds.email', null] }, null, '$ofcreds.email'],
          },
          password: {
            $cond: [{ $eq: ['$ofcreds.password', null] }, null, '$ofcreds.password'],
          },
        },
      },
    ]);

    return creator;
  }
}
