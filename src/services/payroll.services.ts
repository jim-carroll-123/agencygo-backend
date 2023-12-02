import { Payroll } from '@/interfaces/payroll.interface';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { PayrollModel } from '@/models/payroll.model';
import { CreatePayrollDto } from '@/dtos/payroll.dto';

@Service()
export class PayrollService {
  public async createPayroll(payrollData: CreatePayrollDto): Promise<Payroll> {
    try {
      const newPayroll = new PayrollModel({
        ...payrollData,
      });
      // Save the Payroll
      const createdPayroll = await newPayroll.save();
      return createdPayroll;
    } catch (error) {
      throw error;
    }
  }

  public async getAllPayrolls(): Promise<Payroll[]> {
    const payrolls: Payroll[] = await PayrollModel.find();
    return payrolls;
  }

  public async getSinglePayroll(payrollId: string): Promise<Payroll> {
    try {
      const singlePayroll: Payroll = await PayrollModel.findOne({ _id: payrollId });
      return singlePayroll;
    } catch (error) {
      throw error;
    }
  }

  public async deletePayroll(payrollId: string): Promise<Payroll> {
    try {
      const deletedPayroll = await PayrollModel.findByIdAndDelete(payrollId);
      if (!deletedPayroll) throw new HttpException(404, 'Payroll doesnt exist');
      return deletedPayroll;
    } catch (error) {
      throw error;
    }
  }

  public async updatePayroll(id: string, data: CreatePayrollDto): Promise<Payroll> {
    try {
      const updatedPayroll = await PayrollModel.findByIdAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
        },
      );
      if (!updatedPayroll) throw new HttpException(404, "Payroll doesn't exist");
      return updatedPayroll;
    } catch (error) {
      throw error;
    }
  }
}
