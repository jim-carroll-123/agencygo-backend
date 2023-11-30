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
      const data: { success: boolean; data: Attendance } = await this.attendance.createTimeLog(req.body, req.user);
      res.status(200).json({ ack: 1, message: 'Timer Started', data: data });
    } catch (error) {
      next(error);
    }
  };

  public getAttandanceByEmpId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate } = req.params;

      if (startDate && endDate) {
        const filteredAttendance = await this.attendance.getAttendanceByEmpId(req.user._id, startDate, endDate);
        res.status(200).json({ ack: 1, message: 'Filtered Attendance', data: filteredAttendance });
      } else {
        const allAttendance = await this.attendance.getAttendanceByEmpId(req.user._id);
        res.status(200).json({ ack: 1, message: 'All Attendance', data: allAttendance });
      }
    } catch (error) {
      next(error);
    }
  };

  public getTodaysTimsheets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allAttendance = await this.attendance.getTodaysTimsheets();
      res.status(200).json({ ack: 1, message: 'All Attendance', data: allAttendance });
    } catch (error) {
      next(error);
    }
  };

  public updateAttendaceByEmpId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attendanceId = req.params.attendanceId;
      const updatedAttendanceData: Attendance = await this.attendance.updateAttendaceByEmpId(attendanceId, req.body);
      res.status(200).json({ ack: 1, message: 'Attendance updated', data: updatedAttendanceData });
    } catch (error) {
      next(error);
    }
  };

  public updateNotesById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attendanceId = req.params.attendanceId;
      const updatedAttendanceData: Attendance = await this.attendance.updateNotesById(attendanceId, req.body);
      res.status(200).json({ ack: 1, message: 'Notes updated successfully', data: updatedAttendanceData });
    } catch (error) {
      next(error);
    }
  };
}
