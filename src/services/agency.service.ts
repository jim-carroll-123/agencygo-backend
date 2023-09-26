import { Agency } from '@/interfaces/agency.interface';
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
    const agency: Agency[] = await AgencyModel.find();
    return agency;
  }

  public updateAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const agencyData: Agency = req.body;
      const updatedAgency = await this.agency.updateAgency(agencyId, agencyData);
      res.status(200).json({ data: updatedAgency, message: 'Agency updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public async deleteAgency(agencyId: string): Promise<Agency> {
    const deleteAgencyById: Agency = await AgencyModel.findByIdAndDelete(agencyId);
    if (!deleteAgencyById) throw new HttpException(404, "Agency doesn't exist");

    return deleteAgencyById;
  }
}
