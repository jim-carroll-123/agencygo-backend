import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Attendance } from '@/interfaces/attendance.interface';
import { AttendanceServices } from '@/services/attendance.service';

interface $conflict {
  message: string;
  success: boolean;
}

export class AttendanceController {
  public attendance = Container.get(AttendanceServices);

  public createTimeLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: Attendance } = await this.attendance.createTimeLog(req.body);
      res.status(200).json({ message: 'Timer Started', data: data });
    } catch (error) {
      next(error);
    }
  };

  public getAttandanceByEmpId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.employeeId;
      const allAttendance: Attendance[] = await this.attendance.getAttandanceByEmpId(employeeId);
      res.status(200).json({ message: 'All Attendance', data: allAttendance });
    } catch (error) {
      next(error);
    }
  };

  public updateAttendaceByEmpId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attendanceId = req.params.attendanceId;
      const updatedAttendanceData: Attendance = await this.attendance.updateAttendaceByEmpId(attendanceId, req.body);
      res.status(200).json({ message: 'Attendance updated', data: updatedAttendanceData });
    } catch (error) {
      next(error);
    }
  };
}
