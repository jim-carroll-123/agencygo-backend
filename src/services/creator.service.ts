import { HttpException } from '@/exceptions/httpException';
import { Creator } from '@/interfaces/creator.interface';
import { CreatorModel } from '@/models/creator.model';
import { Service } from 'typedi';

@Service()
export class CreatorService {
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
}
