import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EmployeeService } from '@/services/employee.service';
import { Employee, EmployeeCreate, EmployeeUpdate } from '@/interfaces/employee.interface';

export class EmployeeController {
  public employee = Container.get(EmployeeService);
  // create employee
  public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeData: EmployeeCreate = req.body;
      const agencyId = req.params.id;
      const createEmployeeData: Employee = await this.employee.createEmployee(employeeData, agencyId);

      res.status(201).json({ data: createEmployeeData, message: 'Employee created successfully' });
    } catch (error) {
      next(error);
    }
  };

  // Get all agency employees
  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const employees = await this.employee.getAgencyEmployees(agencyId);
      res.status(200).json({ data: employees, message: 'Employees fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  // Get employee by id
  public getEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId;
      const employee = await this.employee.getEmployeeById(employeeId);
      res.status(200).json({ data: employee, message: 'Employee fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  // update employee by id
  public updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId;
      const employeeData: EmployeeUpdate = req.body;
      const updatedEmployee = await this.employee.updateEmployee(employeeId, employeeData);
      res.status(200).json({ data: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  // delete employee by id
  public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId;
      await this.employee.deleteEmployee(employeeId);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  // assign role to employee
  public assignRoleToEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.employeeId;
      const employee = await this.employee.assignRoleToEmployee(employeeId, req.body.role);
      res.status(200).json({ data: employee, message: 'Employee role updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}
