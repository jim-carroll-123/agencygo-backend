import { Invoicing } from '@/interfaces/invoicing.interface';
import { Service } from 'typedi';
import { UserModel } from '@models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { InvoicingModel } from '@/models/invoicing.model';

@Service()
export class InvoicingService {
  public async createInvoicing(invoicingData: Invoicing): Promise<Invoicing> {
    try {
        const newInvoicing = new InvoicingModel({
            ...invoicingData,
        });
        // Save the Invoicing
        const createdInvoicing = await newInvoicing.save();
        return createdInvoicing;
    } catch (error) {
        throw error;
    }
}


    public async getAllInvoicing(): Promise<Invoicing[]> {
        const invoicings: Invoicing[] = await InvoicingModel.find();
        return invoicings;
    }

    public async getsingleInvoicing(invoicingId: string): Promise<Invoicing> {
        try {
            const getInvoicing: Invoicing = await InvoicingModel.findOne({ _id: invoicingId });
            return getInvoicing;
        } catch (error) {
            throw error;
        }
    }

    public async deleteInvoicing(invoicingId: string): Promise<Invoicing> {
      try {
          const deletedInvoicing = await InvoicingModel.findByIdAndDelete(invoicingId);
          if (!deletedInvoicing) throw new HttpException(404, "Invoicing doesn't exist");
          return deletedInvoicing;
      } catch (error) {
          throw error;
      }
  }
  
  public async updateInvoicing(id: string, data: Invoicing): Promise<Invoicing> {
      try {
          const updatedInvoicing = await InvoicingModel.findByIdAndUpdate(
              {
                  _id: id,
              },
              data,
              {
                  new: true,
              }
          );
          if (!updatedInvoicing) throw new HttpException(404, "Invoicing doesn't exist");
          return updatedInvoicing;
      } catch (error) {
          throw error;
      }
  }
  
}
