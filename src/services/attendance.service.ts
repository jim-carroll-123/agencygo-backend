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
      isClockedOut: false,
    });
    return { success: true, data: attendance };
  }

  public async getAttendanceByFilter(query, user): Promise<Attendance[]> {
    const { startDate, endDate, isEmp } = query;

    let dateFilter = {};
    let empFilter = {};

    if (startDate && moment(startDate).isValid() && endDate && moment(endDate).isValid()) {
      const startDateTime = moment(startDate).startOf('day').toDate();
      const endDateTime = moment(endDate).endOf('day').toDate();

      dateFilter = {
        startDateTime: {
          $gte: startDateTime,
          $lte: endDateTime,
        },
      };
    }
    if (isEmp === 'true') {
      empFilter = { employeeId: user._id };
    }

    const attendance: Attendance[] = await AttendanceModal.aggregate([
      {
        $match: {
          ...empFilter,
          ...dateFilter,
          isClockedOut: true,
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
      {
        $lookup: {
          from: 'users',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'users',
        },
      },
    ]).sort({ startDateTime: -1 });

    if (!attendance || attendance.length === 0) {
      return [];
    }
    return attendance;
  }

  public async getAttendanceById(params) {
    const objectId = new mongoose.Types.ObjectId(params.attendanceId);

    const attendance: Attendance[] = await AttendanceModal.aggregate([
      {
        $match: { _id: objectId },
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

    console.log('attendance', attendance);

    if (!attendance || attendance.length === 0) {
      return [];
    }
    return attendance;
  }

  public async getAttandanceAll(): Promise<Attendance[]> {
    const models = [
      {
        $lookup: {
          from: 'timelines',
          localField: '_id',
          foreignField: 'attendanceId',
          as: 'timeline',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'users',
        },
      },
    ];
    const attendanceNotClockedOut: Attendance[] = await AttendanceModal.aggregate([
      {
        $match: { isClockedOut: false },
      },
      ...models,
    ]).sort({ startDateTime: -1 });
    const attendanceClockedOut: Attendance[] = await AttendanceModal.aggregate([
      {
        $match: { isClockedOut: true },
      },
      ...models,
    ]).sort({ startDateTime: -1 });

    if (attendanceNotClockedOut.length > 0 || attendanceClockedOut.length > 0) {
      return [...attendanceNotClockedOut, ...attendanceClockedOut];
    } else {
      throw new HttpException(409, 'Attendance not found');
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
            isClockedOut: attandanceData.isClockedOut,
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

  public async updateTimesheetById(attendanceId: string, attandanceData: Attendance) {
    const objectId = new mongoose.Types.ObjectId(attendanceId);
    console.log('attandanceData', attandanceData);
    try {
      const attendance = await AttendanceModal.findByIdAndUpdate(
        { _id: objectId },
        {
          $set: {
            _id: objectId,
            ...attandanceData,
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

  public async deleteById(attId: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(attId);
      const result = await AttendanceModal.deleteOne({
        _id: objectId,
      });
      return result;
    } catch (error) {
      throw new HttpException(500, 'Something Went Wrong');
    }
  }
}
