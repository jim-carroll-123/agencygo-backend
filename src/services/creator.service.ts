import { HttpException } from '@/exceptions/httpException';
import { Creator } from '@/interfaces/creator.interface';
import { IProxy } from '@interfaces/proxy.interface';
import { ProxyModel } from '@/models/proxy.model';
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
          status: 1,
          'assignEmployee.name': 1,
          'assignEmployee._id': 1,
          plateform: 1,
          gender: 1,
          internalNotes: 1,
          autoRelink: 1,
          proxy: 1,
        },
      },
    ]);
    return creators;
  }

  public async createCreator(creatorData: Creator) {
    //TODO: Check if employee assigned exist
    try {
      const createdCreator = new CreatorModel(creatorData);
      return await createdCreator.save();
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

  private async fetchProxyListFromApi() {
    try {
      const axiosConfig = {
        method: 'get',
        url: PROXY_URL,
        params: {
          mode: 'direct',
          page: '1',
          page_size: '25',
        },
        headers: {
          Authorization: `Token ${PROXY_API_KEY}`,
        },
      };
      const response = await axios(axiosConfig);
      return response.data.results;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch proxy list');
    }
  }

  public async createProxy(creatorId: string): Promise<IProxy> {
    try {
      let proxy = await this.findUnassignedProxy();

      if (!proxy) {
        const newProxies = await this.fetchProxyListFromApi();

        const uniqueNewProxies = await this.filterUniqueProxies(newProxies);

        await this.addToProxyPool(uniqueNewProxies);
        proxy = await this.findUnassignedProxy();

        if (!proxy) {
          throw new HttpException(404, 'No proxies available');
        }
      }
      proxy.creator = creatorId;
      proxy.save();

      const creator = await CreatorModel.findById(creatorId);
      if (creator) {
        creator.proxy = proxy._id;
        await creator.save();
      } else {
        throw new HttpException(404, 'Creator not found');
      }

      return proxy;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException(500, 'Failed to create proxy');
    }
  }

  private async filterUniqueProxies(newProxies: any[]) {
    const existingProxies = await ProxyModel.find({}, 'proxy_id');
    const existingProxyIds = existingProxies.map(proxy => proxy.proxy_id);

    return newProxies.filter(proxy => !existingProxyIds.includes(proxy.id));
  }

  private async findUnassignedProxy() {
    return await ProxyModel.findOne({ creator: null });
  }

  private async addToProxyPool(newProxies: any[]) {
    for (const proxyData of newProxies) {
      await ProxyModel.create({
        proxy_id: proxyData.id,
        proxyAddress: proxyData.proxy_address,
        username: proxyData.username,
        password: proxyData.password,
        port: proxyData.port,
        valid: proxyData.valid,
        country: proxyData.country,
        city: proxyData.city,
        createdAt: proxyData.created_at,
        creator: null,
      });
    }
  }

  public async getProxy(creatorId: string): Promise<IProxy> {
    const getProxy = await ProxyModel.findOne({ creator: creatorId });
    if (!getProxy) throw new HttpException(404, "Proxy doesn't exist");
    return getProxy;
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

        if (creator.assignEmployee.includes(employeeId)) {
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

    console.log(typeof getData.status);
    if (getData.creator) {
      filter.creatorName = new RegExp(getData.creator, 'i');
    }

    if (getData.status) {
      getData.status = Boolean(getData.status === 'true' ? true : false);
      filter.status = getData.status;
    }

    if (getData.plateformlink) {
      getData.plateformlink = Boolean(getData.plateformlink === 'true' ? true : false);
      filter.plateform = getData.plateformlink;
    }

    if (getData.employeeId) {
      const employeId = new mongoose.Types.ObjectId(getData.employeeId);
      filter.assignEmployee = { $in: [employeId] };
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
          plateform: 1,
          gender: 1,
          internalNotes: 1,
          autoRelink: 1,
          proxy: 1,
        },
      },
    ]);

    return creator;
  }
}
