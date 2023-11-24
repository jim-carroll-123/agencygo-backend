import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import mongoose, { Types } from 'mongoose';
import { Attendance } from '@/interfaces/attendance.interface';
import { AttendanceModal } from '@/models/attendance.model';

@Service()
export class AttendanceServices {
  public async createTimeLog(attData: Attendance) {
    const attendance: Attendance = await AttendanceModal.create({
      employeeId: attData.employeeId,
      startDateTime: attData.startDateTime,
      endDateTime: attData.endDateTime,
      breakTime: attData.breakTime,
      notes: attData.notes,
      totalHours: attData.totalHours,
      breakHours: attData.breakHours,
    });
    return { success: true, data: attendance };
  }

  public async getAttandanceByEmpId(employeeId: string): Promise<Attendance[]> {
    const objectId = new mongoose.Types.ObjectId(employeeId);
    const attendance: Attendance[] = await AttendanceModal.aggregate([{ $match: { employeeId: objectId } }]);
    if (!attendance) throw new HttpException(409, 'attendance not found');

    return attendance;
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
      throw new HttpException(500, 'Something went wrong');
    }
  }
}
