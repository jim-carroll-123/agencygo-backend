import { Invoicing } from '@/interfaces/invoicing.interface';
import { Service } from 'typedi';
import { UserModel } from '@models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { InvoicingModel } from '@/models/invoicing.model';

@Service()
export class InvoicingService {
    public async createInvoicing(InvoicingData: Invoicing, userId: string): Promise<Invoicing> {
        try {
          const user = await UserModel.findOne({ _id: userId });
          if (!user) {
            throw new HttpException(404, `User not found`);
          }
          const newInvoicing = new InvoicingModel({
            ...InvoicingData,
            userId: user._id,
          });
          // save the Invoicing
          const createdInvoicing = await newInvoicing.save();
          return createdInvoicing;
        } catch (error) {
          throw error;
        }
      }

      // public async getAllInvoicing(): Promise<Invoicing[]> {
      //   const Invoicing: Invoicing[] = await InvoicingModel.find();
      //   return Invoicing;
      // }
    
      // public async getsingleInvoicing(InvoicingId: string): Promise<Invoicing> {
      //   try {
      //     const getInvoicing: Invoicing = await InvoicingModel.findOne({ _id: InvoicingId });
      //     return getInvoicing;
      //   } catch (error) {
      //     throw error;
      //   }
      // }
    
      // public updateInvoicing = async (id: string, data: Invoicing) => {
      //   try {
      //     const newInvoicing: Invoicing = await InvoicingModel.findByIdAndUpdate(
      //       {
      //         _id: id,
      //       },
      //       data,
      //       {
      //         new: true,
      //       },
      //     );
      //     return newInvoicing;
      //   } catch (error) {
      //     throw error;
      //   }
      // };
    
      // public async deleteInvoicing(InvoicingId: string): Promise<Invoicing> {
      //   const deleteInvoicingById: Invoicing = await InvoicingModel.findByIdAndDelete(InvoicingId);
      //   if (!deleteInvoicingById) throw new HttpException(404, "Invoicing doesn't exist");
    
      //   return deleteInvoicingById;
      // }

}