import { Service } from 'typedi';
import { EmployeeModel } from '@/models/employee.model';
import { HttpException } from '@/exceptions/httpException';
import { AgencyModel } from '@/models/agency.model';
import { UserModel } from '@/models/users.model';
import { Employee, EmployeeCreate, EmployeeUpdate } from '@/interfaces/employee.interface';
import{Emails} from '@utils/email'
import { hash } from 'bcrypt';
import {Email} from '@/interfaces/common.interface'
import {generateEmailTemplateForActivation}from '../template/activateEmployee'

@Service()
export class EmployeeService {
  // create employee
  public async createEmployee(employeeData: EmployeeCreate, agencyId: string): Promise<Employee> {
    try {
      const agency = await AgencyModel.findOne({ _id: agencyId });
      if (!agency) {
        throw new HttpException(404, 'Agency not found');
      }
      const employeeExist = await EmployeeModel.findOne({ email: employeeData.email, agencyId: agencyId });
      if (employeeExist) {
        throw new HttpException(409, `User already registered`);
      }
      let user = await UserModel.findOne({ email: employeeData.email });
      if (!user) {
        // temp default password for development
        const hashedPassword = await hash('development', 10);
        const payload = {
          firstName: employeeData.name,
          lastName: '',
          email: employeeData.email,
          password: hashedPassword,
          isEmployee: true,
          role: employeeData.role,
          agencyId: agencyId,
        };
        user = await UserModel.create(payload);
      }
      const employee = await EmployeeModel.create({
        name: employeeData.name,
        email: employeeData.email,
        agencyId: agencyId,
        role: employeeData.role,
        userId: user._id,
        status: 'active',
      });

      let template= generateEmailTemplateForActivation(employee,agency.agencyName)
      let emailData:Email={
        to:employee.email,
        subject:"Activate Employee Account",
        template:template
      }
      await new Emails().sendEmail(emailData)
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      console.log(error?.message || error?.msg);
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // get all employees of a agency
  public async getAgencyEmployees(agencyId: string) {
    try {
      const employees = await EmployeeModel.find({ agencyId: agencyId });
      console.log(employees);
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
  public async updateEmployee(employeeId: string, employeeData: EmployeeUpdate) {
    try {
      const hashedPassword = await hash(employeeData.password, 10);
      const employee = await EmployeeModel.findByIdAndUpdate(employeeId, {
        $set: {
          name: employeeData.name,
          email: employeeData.email,
          role: employeeData.role,
          agencyId: employeeData.agencyId,
          status:employeeData.status,
          password:hashedPassword
        },
      });
      return employee;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, 'Something went wrong');
    }
  }

  // delete employees by employee id
  public async deleteEmployee(employeeId: string) {
    try {
      const deleteEmployee = await EmployeeModel.findByIdAndDelete(employeeId);
      return deleteEmployee;
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
