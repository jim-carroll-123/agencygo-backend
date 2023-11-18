import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EmployeeService } from '@/services/employee.service';
import { Employee, EmployeeCreate, EmployeeUpdate } from '@/interfaces/employee.interface';
import { ChatController } from '@/controllers/chat.controller';

export class EmployeeController {
  public employee = Container.get(EmployeeService);
  public chat = Container.get(ChatController);
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
      return res.status(200).json({ data: employees, message: 'Employees fetched successfully' });
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
      if (!updatedEmployee) return res.status(404).json({ data: updatedEmployee, message: 'Employee not found' });
      else return res.status(200).json({ data: updatedEmployee, message: 'Employee updated successfully' });
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

  public searchEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryData = req.query;
      console.log('*******', req.query);
      const employee = await this.employee.getEmployees(queryData);
      res.status(200).json({ data: employee, message: 'Employee fetched successfully' });
    } catch (error) {
      next(error);
    }
  };

  // batch update employee
  public updateBatchEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.body;
      const employeeRole: string = (req.query.role as string) || '';
      const agencyId: string = (req.query.agencyId as string) || '';
      const updatedEmployee = await this.employee.updateBatchEmployee(employeeId, employeeRole, agencyId);
      res.status(200).json({ data: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  // delete employee by id
  public deleteBatchEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.body;
      await this.employee.deleteBatchEmployeesByIds(employeeId);
      res.status(200).json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
