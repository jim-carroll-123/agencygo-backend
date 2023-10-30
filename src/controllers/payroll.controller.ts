import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { PayrollService } from '@/services/payroll.services';
import { CreatePayrollDto } from '@/dtos/payroll.dto';  // Import the DTO
import { validate } from 'class-validator'; // Import the validate function

export class PayrollController {
  public payroll = Container.get(PayrollService);

  public createPayroll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollData: CreatePayrollDto = req.body; // Use the DTO for validation
      // Validate the input using class-validator decorators
      const errors = await validate(payrollData);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // If the input is valid, create the payroll entry
      const createPayrollData = await this.payroll.createPayroll(payrollData);
      res.status(201).json({ data: createPayrollData, message: 'Payroll created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getPayrolls = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allPayrolls = await this.payroll.getAllPayrolls();
      res.status(200).json({ data: allPayrolls, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public getSinglePayroll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollId = req.params.id;
      const singlePayroll = await this.payroll.getSinglePayroll(payrollId);
      res.status(200).json({ data: singlePayroll, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public deletePayroll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollId = req.params.id;
      const deletedPayroll = await this.payroll.deletePayroll(payrollId);
      res.status(200).json({ data: deletedPayroll, message: 'Payroll deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updatePayroll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payrollId = req.params.id;
      const payrollData: CreatePayrollDto = req.body;
      // Validate the input using class-validator decorators
      const errors = await validate(payrollData);

      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      const updatedPayroll = await this.payroll.updatePayroll(payrollId, payrollData);
      res.status(200).json({ data: updatedPayroll, message: 'Payroll updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}
