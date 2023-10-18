import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ShiftModel } from '@models/shifts.model';
import { Shifts } from '@interfaces/shifts.interface';

@Service()
export class ShiftServices {
  public async findAllShifts(): Promise<Shifts[]> {
    const shifts: Shifts[] = await ShiftModel.find();
    if (!shifts) throw new HttpException(409, 'Shifts not found');

    return shifts;
  }
  public async createShift(shiftData: Shifts) {
    console.log(shiftData);
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

    return shiftResponce;
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
}
