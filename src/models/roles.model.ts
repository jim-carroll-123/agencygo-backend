import { Schema, model } from 'mongoose';
import { Role } from '@interfaces/roles.interface';

// Create a RoleSchema
const RoleSchema = new Schema<Role>({
  rolename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
});

// Create the Role model
export const RoleModel = model<Role>('Role', RoleSchema);
