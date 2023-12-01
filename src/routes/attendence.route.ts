import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { AttendanceController } from '@/controllers/attendance.controller';
export class AttendanceRoute implements Routes {
  public path = '/attendence';
  public router = Router();
  public attendanceController = new AttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, AuthMiddleware, this.attendanceController.createTimeLog);

    this.router.get(`${this.path}/getAttendanceAll`, AuthMiddleware, this.attendanceController.getAttandanceAll);

    this.router.get(`${this.path}/getAttendanceByFilter`, AuthMiddleware, this.attendanceController.getAttendanceByFilter);

    this.router.get(`${this.path}/getTodaysTimsheets`, AuthMiddleware, this.attendanceController.getTodaysTimsheets);
    this.router.put(`${this.path}/update/empAttendance/:attendanceId`, AuthMiddleware, this.attendanceController.updateAttendaceByEmpId);
    this.router.patch(`${this.path}/update/notes/:attendanceId`, AuthMiddleware, this.attendanceController.updateNotesById);
    this.router.patch(`${this.path}/update/timesheet/:attendanceId`, AuthMiddleware, this.attendanceController.updateTimesheetById);
    this.router.delete(`${this.path}/delete/timesheet/:attendanceId`, AuthMiddleware, this.attendanceController.deleteById);
  }
}
