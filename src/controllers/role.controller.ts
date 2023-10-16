import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Role } from '@interfaces/roles.interface';
import { RoleService } from '@services/role.service';

export class RoleController {
  public role = Container.get(RoleService);

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleData: Role = req.body;
      const createRole = await this.role.createRole(roleData);
      res.status(201).json({ data: createRole, message: 'role created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllRole: Role[] = await this.role.getRoles();
      res.status(200).json({ data: getAllRole, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const deleteRoleData = await this.role.deleteRole(roleId);
      res.status(200).json({ data: deleteRoleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId: string = req.params.id;
      const userData = req.body;
      const updateRoleData: Role = await this.role.updateRole(roleId, userData);
      res.status(200).json({ data: updateRoleData, message: 'data updated' });
    } catch (error) {
      next(error);
    }
  };
  public searchRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const searchTerm = req.query;
      console.log(searchTerm, '-------------------------------------------->>>');
      const searchResult = await this.role.searchRole(searchTerm);
      res.status(200).json({ data: searchResult, message: 'searched' });
    } catch (error) {
      next(error);
    }
  };
}
