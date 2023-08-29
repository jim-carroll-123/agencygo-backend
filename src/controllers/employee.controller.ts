import { Employee } from '@/interfaces/employee.interface';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { EmployeeService } from '@/services/employee.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EmployeeController {
  public employee = Container.get(EmployeeService);
  public createEmployee = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const employeeData: Employee = req.body;
      const agencyId = req.params.id;
      const createEmployeeData: Employee = await this.employee.createEmployee(employeeData, agencyId);

      res.status(201).json({ data: createEmployeeData, message: 'Employee created successfully' });
    } catch (error) {
      next(error);
    }
  };
}
