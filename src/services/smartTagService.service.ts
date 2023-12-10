import { SmartTag } from '@/interfaces/smartTag.interface';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { smartTagModel } from '@/models/smartTag.model';

@Service()
export class SmartTagService {
  public async createSmartTag(smartTagData: SmartTag): Promise<SmartTag> {
    try {
      const newSmartTag = new smartTagModel({
        ...smartTagData,
      });
      // Save the SmartTags
      const createdSmartTag = await newSmartTag.save();
      return createdSmartTag;
    } catch (error) {
      throw `Create: ${error.message}`;
    }
  }

  public async getSmartTags(): Promise<SmartTag[]> {
    try {
      const smartTags: SmartTag[] = await smartTagModel.find();
      return smartTags;
    } catch (error) {
      throw new HttpException(500, `Get: ${error.message}`);
    }
  }

  public async getSmartTagById(smartTagId: string) {
    const findSmartTag: SmartTag = await smartTagModel.findOne({ _id: smartTagId });
    if (!findSmartTag) throw new HttpException(409, "Get: smart tag doesn't exist");

    return findSmartTag;
  }

  public async updateSmartTag(smartTagId: string, smartTagData: SmartTag) {
    try {
      const updateSmartTag = await smartTagModel.findByIdAndUpdate(smartTagId, smartTagData, { new: true });

      if (!updateSmartTag) {
        throw new HttpException(404, 'smart tag not found.');
      }

      return updateSmartTag;
    } catch (error) {
      throw new HttpException(500, `Update: ${error.message}`);
    }
  }
  public async deleteSmartTag(smartTagId: string): Promise<void> {
    try {
      const role = await smartTagModel.findByIdAndRemove(smartTagId);

      if (!role) {
        throw new HttpException(404, 'smart tag not found');
      }
    } catch (error) {
      throw new HttpException(500, `Delete: ${error.message}`);
    }
  }
}
