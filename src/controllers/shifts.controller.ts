import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Shifts } from '@interfaces/shifts.interface';
import { ShiftServices } from '@services/shifts.service';

interface $conflict {
  message: string;
  success: boolean;
}

export class ShiftsController {
  public shift = Container.get(ShiftServices);

  public getShifts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AllShifts: Shifts[] = await this.shift.findAllShifts();
      res.status(200).json({ message: 'All Shifts', data: AllShifts });
    } catch (error) {
      next(error);
    }
  };
  public createShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Shifts = req.body;
      const shiftCreated: { success: boolean; data: Shifts } | $conflict = await this.shift.createShift(data);
      if (shiftCreated.success) {
        res.status(200).json({ message: 'Shift created' });
      } else {
        res.status(409).json({ message: 'Shift already exist' });
      }
    } catch (error) {
      next(error);
    }
  };
  public updateShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId = req.params.id;
      const updatedShiftData: Shifts = await this.shift.updateShift(shiftId, req.body);
      res.status(200).json({ message: 'shift updated', data: updatedShiftData });
    } catch (error) {
      next(error);
    }
  };
  public deleteShift = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId = req.params.id;
      const deleteShift = await this.shift.deleteShift(shiftId);
      res.status(200).json({ message: 'Shift Deleted', data: deleteShift });
    } catch (error) {
      next(error);
    }
  };
  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftEmployees = await this.shift.getAllEmployees();
      res.status(200).json({ message: 'Shift Employees', data: shiftEmployees });
    } catch (error) {
      next(error);
    }
  };
}
