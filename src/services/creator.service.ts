import { HttpException } from '@/exceptions/httpException';
import { Creator } from '@/interfaces/creator.interface';
import { CreatorModel } from '@/models/creator.model';
import { Service } from 'typedi';

@Service()
export class CreatorService {
  // get all creators
  public async getCreators(): Promise<Creator[]> {
    const creators: Creator[] = await CreatorModel.find();
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
}
