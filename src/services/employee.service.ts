import { Types } from 'mongoose';
import { Service } from 'typedi';
import { EmployeeModel } from '@/models/employee.model';
import { HttpException } from '@/exceptions/httpException';
import { AgencyModel } from '@/models/agency.model';
import { UserModel } from '@/models/users.model';
import { User } from '@/interfaces/users.interface';

@Service()
export class EmployeeService {
  // create employee
  public async createEmployee(employeeData: User, agencyId: string): Promise<Partial<User>> {
    try {
      const agency = await AgencyModel.findOne({ _id: agencyId });
      if (!agency) {
        throw new HttpException(404, 'Agency not found');
      }
      const user = await UserModel.findOne({ email: employeeData.email });
      if (user) {
        throw new HttpException(409, `User already registered`);
      }
      Object.assign(employeeData, { isEmployee: true });
      if (employeeData.role) {
        delete employeeData.role;
      }
      // create the employee with agency id
      const newEmployee = new UserModel({
        ...employeeData,
        agencyId: new Types.ObjectId(agencyId),
      });
      // save the employee
      return await newEmployee.save();
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // get all employees of a agency
  public async getAgencyEmployees(agencyId: string) {
    try {
      const employees = await UserModel.find({ agencyId: agencyId }).lean();
      return employees;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // get employee by employee id
  public async getEmployeeById(employeeId: string) {
    try {
      const employee = await UserModel.findOne({ _id: employeeId });
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // update employee by an employee id
  public async updateEmployee(employeeId: string, employeeData: Partial<User>) {
    try {
      if (employeeData.role) {
        delete employeeData.role;
      }
      const updatedEmployee = await UserModel.findByIdAndUpdate(
        {
          _id: employeeId,
        },
        {
          $set: employeeData,
          $inc: { __v: 1 },
        },
        {
          new: true,
        },
      );
      return updatedEmployee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // delete employees in a batch
  public async deleteEmployees(employeeIds: [string]) {
    try {
      const deletedEmployees = await UserModel.deleteMany({
        _id: { $in: employeeIds },
      });
      return deletedEmployees;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // assign role to employee
  public async assignRoleToEmployee(employeeId: string, role: string) {
    try {
      const updateObj = {
        role,
      };
      if (role === 'admin') {
        Object.assign(updateObj, {
          isEmployee: false,
          isAdmin: true,
        });
      }
      const employee = await EmployeeModel.findByIdAndUpdate(
        employeeId,
        {
          $set: updateObj,
          $inc: { __v: 1 },
        },
        { new: true },
      );
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }
}
