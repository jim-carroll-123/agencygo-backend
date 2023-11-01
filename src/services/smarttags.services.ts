import { smartTags } from '@/interfaces/smarttags.interface';
import { Service } from 'typedi';
import { UserModel } from '@models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { smartTagsModel } from '@/models/smarttags.model';

@Service()
export class SmartTagsService {
  public async createSmartTags(smartTagsData: smartTags): Promise<smartTags> {
    try {
        const newSmartTags = new smartTagsModel({
            ...smartTagsData,
        });
        // Save the SmartTags
        const createdSmartTags = await newSmartTags.save();
        return createdSmartTags;
    } catch (error) {
        throw error;
    }
}


}