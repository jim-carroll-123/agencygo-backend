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

  // get all employees of a agency
  public async getAgencyEmployees(agencyId: string) {
    try {
      const employees = await EmployeeModel.find({ agencyId: agencyId }).lean();
      return employees;
    } catch (error) {
      throw error;
    }
  }

  // get employee by employee id
  public async getEmployeeById(employeeId: string) {
    try {
      const employee = await EmployeeModel.findOne({ _id: employeeId });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  // update employee by an employee id
  public async updateEmployee(employeeId: string, employeeData: Partial<Employee>) {
    try {
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        {
          _id: employeeId,
        },
        {
          $set: employeeData,
        },
        {
          new: true,
        },
      );
      return updatedEmployee;
    } catch (error) {
      throw error;
    }
  }

  // delete employees in a batch
  public async deleteEmployees(employeeIds: [string]) {
    try {
      const deletedEmployees = await EmployeeModel.deleteMany({
        _id: { $in: employeeIds },
      });
      return deletedEmployees;
    } catch (error) {
      throw error;
    }
  }
}
