import { HttpException } from '@/exceptions/httpException';
import { RoleModel } from '@models/roles.model';
import { Role } from '@/interfaces/roles.interface';
import { Service } from 'typedi';

@Service()
export class RoleService {
  //create role
  public async createRole(roleData: Role): Promise<Role> {
    try {
      const rolename = roleData.rolename.toLowerCase();
      const isrole = await RoleModel.findOne({ rolename: rolename });
      if (isrole) {
        throw new HttpException(409, `Role already registered`);
      }
      const role = await RoleModel.create({ rolename: rolename, description: roleData.description });
      return role;
    } catch (error) {
      throw new HttpException(500, 'Something went wrong');
    }
  }

  public async getRoles(): Promise<Role[]> {
    try {
      const roles: Role[] = await RoleModel.find();
      return roles;
    } catch (error) {
      throw new HttpException(500, 'Something went wrong');
    }
  }
  public async deleteRole(roleId: string): Promise<void> {
    try {
      const role = await RoleModel.findByIdAndRemove(roleId);

      if (!role) {
        throw new HttpException(404, 'Role not found');
      }
    } catch (error) {
      throw new HttpException(500, 'Something went wrong');
    }
  }

  public async updateRole(roleId: string, roleData: Role): Promise<Role> {
    try {
      const updatedRole = await RoleModel.findByIdAndUpdate(roleId, roleData, { new: true });

      if (!updatedRole) {
        throw new HttpException(404, 'Role not found');
      }

      return updatedRole;
    } catch (error) {
      throw new HttpException(500, 'Something went wrong');
    }
  }
}
