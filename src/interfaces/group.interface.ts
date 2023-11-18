import mongoose from 'mongoose';
export interface Group {
  parentAgencyId: mongoose.Types.ObjectId;
  name: string;
  isSubGroup: boolean;
  subgroups: Group[];
}
