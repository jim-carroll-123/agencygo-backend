import { Agency } from '@/interfaces/agency.interface';
import { models } from 'mongoose';
import { Service } from 'typedi';
import { UserModel } from '@models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { AgencyModel } from '@/models/agency.model';

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
        user: user._id,
      });

      // save the agency
      const createdAgency = await newAgency.save();

      return createdAgency;
    } catch (error) {
      throw error;
    }
  }
}
