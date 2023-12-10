import { Tier } from '@/interfaces/tier.interface';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { tierModel } from '@/models/tier.model';

@Service()
export class TierService {
  public async createTier(tierData: Tier): Promise<Tier> {
    try {
      const newTier = new tierModel({
        ...tierData,
      });
      const createdTier = await newTier.save();
      return createdTier;
    } catch (error) {
      throw `Create: ${error.message}`;
    }
  }

  public async getTiers(): Promise<Tier[]> {
    try {
      const tier: Tier[] = await tierModel.find();
      return tier;
    } catch (error) {
      throw new HttpException(500, `Get: ${error.message}`);
    }
  }

  public async getTierById(tierId: string) {
    const findTier: Tier = await tierModel.findOne({ _id: tierId });
    if (!findTier) throw new HttpException(409, "Get: tier doesn't exist");

    return findTier;
  }

  public async updateTier(tierId: string, tierData: Tier) {
    try {
      const updateTier = await tierModel.findByIdAndUpdate(tierId, tierData, { new: true });

      if (!updateTier) {
        throw new HttpException(404, 'tier not found.');
      }

      return updateTier;
    } catch (error) {
      throw new HttpException(500, `Update: ${error.message}`);
    }
  }
  public async deleteTier(tierId: string): Promise<void> {
    try {
      const role = await tierModel.findByIdAndRemove(tierId);

      if (!role) {
        throw new HttpException(404, 'tier not found');
      }
    } catch (error) {
      throw new HttpException(500, `Delete: ${error.message}`);
    }
  }
}
