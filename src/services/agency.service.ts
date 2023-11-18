import { Agency } from '@/interfaces/agency.interface';
import { Group } from '@/interfaces/group.interface';
import { Service } from 'typedi';
import { UserModel } from '@models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { AgencyModel } from '@/models/agency.model';
import { GroupModel } from '@/models/group.model';
import mongoose from 'mongoose';

@Service()
export class AgencyService {
  public async createAgency(agencyData: Agency, userId: string): Promise<Agency> {
    try {
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        throw new HttpException(404, `User not found`);
      }
      // Create the agency with user's ID as owner of agency
      const newAgency = new AgencyModel({
        ...agencyData,
        userId: user._id,
      });
      // save the agency
      const createdAgency = await newAgency.save();
      return createdAgency;
    } catch (error) {
      throw error;
    }
  }

  public async getAllAgency(): Promise<Agency[]> {
    const agency: Agency[] = await AgencyModel.find().populate('groups');
    return agency;
  }

  public async getsingleagency(agencyId: string): Promise<Agency> {
    try {
      const getagency: Agency = await AgencyModel.findOne({ _id: agencyId });
      return getagency;
    } catch (error) {
      throw error;
    }
  }

  public updateAgency = async (id: string, data: Group) => {
    try {
      const newAgency: Agency = await GroupModel.findByIdAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        },
      );
      return newAgency;
    } catch (error) {
      throw error;
    }
  };

  public async deleteAgency(agencyId: string): Promise<Agency> {
    const deleteAgencyById: Agency = await AgencyModel.findByIdAndDelete(agencyId);
    if (!deleteAgencyById) throw new HttpException(404, "Agency doesn't exist");

    return deleteAgencyById;
  }
  public async addSubGroup(agencyId: string, name: string, parentAgencyId: string): Promise<Group> {
    try {
      const query = { _id: parentAgencyId };
      const options = { upsert: true };
      const addgroup = await GroupModel.create({
        parentAgencyId: agencyId,
        name: name,
      });
      if (addgroup) {
        await Promise.all([
          AgencyModel.findByIdAndUpdate(query, { $set: { isSubGroup: true } }, options),
          GroupModel.findByIdAndUpdate({ _id: agencyId }, { $set: { isSubGroup: true } }),
        ]);
      }
      return addgroup;
    } catch (error) {
      console.log(error);
    }
  }
  public async showGroup(agencyId: string) {
    try {
      const subgroups = await GroupModel.find({ parentAgencyId: agencyId });

      if (!subgroups || subgroups.length === 0) {
        console.log(`No subgroups found for agency ID ${agencyId}`);
        return [];
      }

      const hierarchy = [];

      for (const subgroup of subgroups) {
        if (subgroup.isSubGroup) {
          const subSubgroups = await this.showGroup(subgroup._id);
          hierarchy.push({ ...subgroup.toObject(), subgroups: subSubgroups });
        } else {
          hierarchy.push(subgroup.toObject());
        }
      }
      return hierarchy;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public updateGroup = async (id: string, data: Group) => {
    try {
      const newGroup: Group = await GroupModel.findByIdAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        },
      );
      return newGroup;
    } catch (error) {
      throw error;
    }
  };

  public async deleteGroup(agencyId: string): Promise<Group> {
    const deleteGroupById: Group = await GroupModel.findByIdAndDelete(agencyId);
    if (!deleteGroupById) throw new HttpException(404, "group doesn't exist");

    return deleteGroupById;
  }
}
