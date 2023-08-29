import { Employee } from '@/interfaces/employee.interface';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { EmployeeService } from '@/services/employee.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EmployeeController {
  public employee = Container.get(EmployeeService);
  // create employee
  public createEmployee = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const employeeData: Employee = req.body;
      const agencyId = req.params.id;
      const createEmployeeData: Employee = await this.employee.createEmployee(employeeData, agencyId);

      res.status(201).json({ data: createEmployeeData, message: 'Employee created successfully' });
    } catch (error) {
      next(error);
    }
  };

  // Get all agency employees
  public getEmployees = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const employees = await this.employee.getAgencyEmployees(agencyId);
      res.status(200).json({ data: employees, message: 'Employees fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  // Get employee by id
  public getEmployee = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId;
      const employee = await this.employee.getEmployeeById(employeeId);
      res.status(200).json({ data: employee, message: 'Employee fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  // update employee by id
  public updateEmployee = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId;
      const employeeData: Employee = req.body;
      const updatedEmployee = await this.employee.updateEmployee(employeeId, employeeData);
      res.status(200).json({ data: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}
