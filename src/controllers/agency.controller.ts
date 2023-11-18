import { Agency } from '@/interfaces/agency.interface';
import { Group } from '@/interfaces/group.interface';
import { AgencyService } from '@/services/agency.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { uploadToS3 } from '@/utils/fileUpload';
import path from 'path';

export class AgencyController {
  public agency = Container.get(AgencyService);
  public createAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyData: Agency = req.body;
      const userId = req.params.id;
      const createAgencyData: Agency = await this.agency.createAgency(agencyData, userId);

      res.status(201).json({ data: createAgencyData, message: 'Agency created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersAgency: Agency[] = await this.agency.getAllAgency();
      res.status(200).json({ data: findAllUsersAgency, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getsingleagency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const findSignleAgency: Agency = await this.agency.getsingleagency(agencyId);
      res.status(200).json({ data: findSignleAgency, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const agencyData: Agency = req.body;
      if (req.file) {
        const originalnameWithoutSpaces = req.file.originalname.replace(/\s/g, '');
        const result = await uploadToS3(req.file.buffer, originalnameWithoutSpaces + Date.now() + path.extname(req.file.originalname));
        agencyData.agencyLogo = result.Location;
      }
      const updatedAgency = await this.agency.updateAgency(agencyId, agencyData);
      res.status(200).json({ data: updatedAgency, message: 'Agency updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAgency = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const deleteAgencyData: Agency = await this.agency.deleteAgency(agencyId);
      res.status(200).json({ data: deleteAgencyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public addSubGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parentAgencyId = req.params.parentAgencyId;
      const { agencyId, name } = req.body;
      const addSubGroup: Group = await this.agency.addSubGroup(agencyId, name, parentAgencyId);
      res.status(200).json({ data: addSubGroup, message: 'group added' });
    } catch (error) {
      next(error);
    }
  };
  public showSubGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const showgroup = await this.agency.showGroup(agencyId);
      res.status(200).json({ data: showgroup });
    } catch (error) {
      next(error);
    }
  };
  public updateGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = req.params.groupId;
      const groupData: Group = req.body;
      const updatedGroup = await this.agency.updateAgency(groupId, groupData);
      res.status(200).json({ data: updatedGroup, message: 'Group updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const agencyId = req.params.agencyId;
      const deleteGroupData: Group = await this.agency.deleteGroup(agencyId);
      res.status(200).json({ data: deleteGroupData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
