import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import mongoose, { Types } from 'mongoose';
import { TimeLine } from '@/interfaces/timeline.interface';
import { TimelineModel } from '@/models/timeline.model';
import { AttendanceModal } from '@/models/attendance.model';
import moment from 'moment';

@Service()
export class TimelineServices {
  public async createTimeline(timelineData: TimeLine, user) {
    const objectId = new mongoose.Types.ObjectId(timelineData.attendanceId);

    const timeline: TimeLine = await TimelineModel.create({
      employeeId: user._id,
      attendanceId: objectId,
      startTime: timelineData.startTime,
      type: timelineData.type,
      endTime: timelineData.endTime,
      total: moment(timelineData.endTime).diff(moment(timelineData.startTime), 'seconds'),
    });
    return { success: true, data: timeline };
  }
  public async getTimelineData(startDateTime?: string) {
    const startDate = moment(startDateTime).startOf('day').toDate();
    const result = await AttendanceModal.aggregate([
      {
        $lookup: {
          from: 'timelines',
          localField: '_id',
          foreignField: 'attendanceId',
          as: 'timeline',
        },
      },
      {
        $match: {
          $or: [
            {
              'timelines.startTime': {
                $gte: startDate,
                $lt: new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
              },
            },
            {
              'timelines.startTime': { $exists: false },
            },
          ],
        },
      },
    ]);

    if (!result) {
      throw new HttpException(409, 'Timeline not found');
    }

    return result;
  }
  public async getTimelineDataAll(user) {
    const result = await TimelineModel.aggregate([
      ...(user?.role === 'manager' || user?.role === 'admin' ? [] : [{ $match: { employeeId: user._id } }]),
      {
        $lookup: {
          from: 'users',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]);

    if (!result) {
      throw new HttpException(409, 'Timeline not found');
    }

    return result;
  }
  public async deleteById(params: string) {
    const { timelineId } = params;
    console.log('timelineId', timelineId);
    try {
      const objectId = new mongoose.Types.ObjectId(timelineId);
      const result = await TimelineModel.deleteOne({
        _id: objectId,
      });
      return result;
    } catch (error) {
      throw new HttpException(500, 'Something Went Wrong');
    }
  }
}
