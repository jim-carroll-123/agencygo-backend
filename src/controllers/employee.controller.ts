import { Employee } from '@/interfaces/employee.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EmployeeService } from '@/services/employee.service';

export class EmployeeController {
  public employee = Container.get(EmployeeService);
  // create employee
  public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeData: Employee = req.body;
      const agencyId = req.params.id;
      const createEmployeeData: Partial<Employee> = await this.employee.createEmployee(employeeData, agencyId);

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
      const employeeData: Employee = req.body;
      const updatedEmployee = await this.employee.updateEmployee(employeeId, employeeData);
      res.status(200).json({ data: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  // delete employees in batch
  public deleteEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeIds = req.body.employeeIds;
      const deletedEmployees = await this.employee.deleteEmployees(employeeIds);
      if (!deletedEmployees.deletedCount) {
        return res.status(404).json({ message: 'Invalid employee id' });
      }
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
