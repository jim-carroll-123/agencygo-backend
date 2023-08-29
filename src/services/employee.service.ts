import { Types } from 'mongoose';
import { Employee } from '@/interfaces/employee.interface';
import { Service } from 'typedi';
import { EmployeeModel } from '@/models/employee.model';
import { HttpException } from '@/exceptions/httpException';
import { AgencyModel } from '@/models/agency.model';

@Service()
export class EmployeeService {
  // create employee
  public async createEmployee(employeeData: Employee, agencyId: string): Promise<Employee> {
    try {
      const agency = await AgencyModel.findOne({ _id: agencyId });
      if (!agency) {
        throw new HttpException(404, 'Agency not found');
      }
      const user = await EmployeeModel.findOne({ employeeEmail: employeeData.employeeEmail });
      if (user) {
        throw new HttpException(404, `User already registered`);
      }
      // create the employee with agency id
      const newEmployee = new EmployeeModel({
        ...employeeData,
        agencyId: new Types.ObjectId(agencyId),
      });
      // save the employee
      return await newEmployee.save();
    } catch (error) {
      throw error;
    }
  }

  // get employee
  // public async getEmployee() {
  // }
}
