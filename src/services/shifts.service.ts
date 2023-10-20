import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ShiftModel } from '@models/shifts.model';
import { Shifts } from '@interfaces/shifts.interface';
import { EmployeeModel } from '@/models/employee.model';
import { Employee } from '@/interfaces/employee.interface';
import { CreatorModel } from '@/models/creator.model';

@Service()
export class ShiftServices {
  public async findAllShifts(): Promise<Shifts[]> {
    const shifts: Shifts[] = await CreatorModel.aggregate([
      {
        $lookup: {
          from: 'shifts',
          localField: '_id',
          foreignField: 'creatorId',
          as: 'shifts',
        },
      },
      {
        $unwind: {
          path: '$shifts',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'shifts.employeeId',
          foreignField: '_id',
          as: 'shifts.employee',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$creatorName' },
          shifts: { $push: '$shifts' },
        },
      },
    ]);
    if (!shifts) throw new HttpException(409, 'Shifts not found');

    return shifts;
  }
  public async createShift(shiftData: Shifts) {
    const { startDate, endDate, creatorId, repeat } = shiftData;
    const existingShifts = await ShiftModel.find({
      creatorId: creatorId,
      $or: [
        {
          $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: startDate } }],
        },
      ],
    });
    for (const existingShift of existingShifts) {
      for (const day in repeat) {
        if (repeat[day] && existingShift.repeat[day]) {
          const response = {
            success: false,
            message: 'Shift scheduling conflict detected. Please choose a different time or date.',
          };
          return response;
        }
      }
    }
    const shiftResponce: Shifts = await ShiftModel.create({
      startTime: shiftData.startTime,
      endTime: shiftData.endTime,
      startDate: shiftData.startDate,
      endDate: shiftData.endDate,
      employeeId: shiftData.employeeId,
      creatorId: shiftData.creatorId,
      frequency: shiftData.frequency,
      repeat: shiftData.repeat,
    });

    return { success: true, data: shiftResponce };
  }
  public async updateShift(shiftId: string, shiftData: Shifts) {
    const updatedShiftData: Shifts = await ShiftModel.findByIdAndUpdate(shiftId, { shiftData }, { new: true });
    if (!updatedShiftData) throw new HttpException(409, 'Shift not found');

    return updatedShiftData;
  }
  public async deleteShift(shiftId: string) {
    const deleteShiftById: Shifts = await ShiftModel.findByIdAndDelete(shiftId);
    if (!deleteShiftById) throw new HttpException(409, 'Shift not found');

    return deleteShiftById;
  }
  public async getAllEmployees() {
    const allEmployees: Employee[] = await EmployeeModel.find();
    if (!allEmployees) throw new HttpException(409, 'Employees not found');

    return allEmployees;
  }
}
