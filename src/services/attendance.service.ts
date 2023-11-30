import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import mongoose, { Types } from 'mongoose';
import { Attendance } from '@/interfaces/attendance.interface';
import { AttendanceModal } from '@/models/attendance.model';
import moment from 'moment';

@Service()
export class AttendanceServices {
  public async createTimeLog(attData: Attendance, user) {
    const attendance: Attendance = await AttendanceModal.create({
      employeeId: user._id,
      startDateTime: attData.startDateTime,
      breakTime: attData.breakTime,
      notes: attData.notes,
      totalHours: attData.totalHours,
      breakHours: attData.breakHours,
      timeLine: attData.timeLine,
    });
    return { success: true, data: attendance };
  }

  public async getAttendanceByEmpId(employeeId: string, startDate?: string, endDate?: string): Promise<Attendance[]> {
    if (startDate && endDate) {
      const startDateTime = moment(startDate).startOf('day').toDate();
      const endDateTime = moment(endDate).endOf('day').toDate();

      const attendance: Attendance[] = await AttendanceModal.aggregate([
        {
          $match: {
            employeeId: employeeId,
            startDateTime: {
              $gte: startDateTime,
              $lte: endDateTime,
            },
          },
        },
        {
          $lookup: {
            from: 'timelines',
            localField: '_id',
            foreignField: 'attendanceId',
            as: 'timeline',
          },
        },
      ]);

      if (!attendance || attendance.length === 0) {
        return [];
      }

      return attendance;
    } else {
      const attendance: Attendance[] = await AttendanceModal.aggregate([
        {
          $match: {
            employeeId: employeeId,
          },
        },
        {
          $lookup: {
            from: 'timelines',
            localField: '_id',
            foreignField: 'attendanceId',
            as: 'timeline',
          },
        },
      ]);

      if (!attendance || attendance.length === 0) {
        throw new HttpException(409, 'Attendance not found');
      }

      return attendance;
    }
  }

  public async getTodaysTimsheets(): Promise<Attendance[]> {
    const allAttendance: Attendance[] = await AttendanceModal.find({});

    if (!allAttendance || allAttendance.length === 0) {
      throw new HttpException(409, 'Attendance not found');
    }

    return allAttendance;
  }

  public async updateAttendaceByEmpId(attendanceId: string, attandanceData: Attendance) {
    const objectId = new mongoose.Types.ObjectId(attendanceId);
    try {
      const attendance = await AttendanceModal.findByIdAndUpdate(
        { _id: objectId },
        {
          $set: {
            _id: objectId,
            employeeId: attandanceData.employeeId,
            startDateTime: attandanceData.startDateTime,
            endDateTime: attandanceData.endDateTime,
            breakTime: attandanceData.breakTime,
            notes: attandanceData.notes,
            totalHours: attandanceData.totalHours,
            breakHours: attandanceData.breakHours,
            timeLine: attandanceData.timeLine,
          },
        },
        { new: true },
      );
      if (!attendance) throw new HttpException(409, "User doesn't exist");
      return attendance;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, `Something went wrong:${error.message}`);
    }
  }

  public async updateNotesById(attendanceId: string, attandanceData: Attendance) {
    const objectId = new mongoose.Types.ObjectId(attendanceId);
    try {
      const attendance = await AttendanceModal.findByIdAndUpdate(
        { _id: objectId },
        {
          $set: {
            _id: objectId,
            notes: attandanceData.notes,
          },
        },
        { new: true },
      );
      if (!attendance) throw new HttpException(409, "User doesn't exist");
      return attendance;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException(500, `Something went wrong:${error.message}`);
    }
  }
}
