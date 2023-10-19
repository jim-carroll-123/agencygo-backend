import { Creator } from '@/interfaces/creator.interface';
import { LoginBotService } from '@/scraper/services/login.service';
import { IProxy } from '@interfaces/proxy.interface';
import { CreatorService } from '@/services/creator.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class CreatorController {
  public creator = Container.get(CreatorService);
  private login = Container.get(LoginBotService);

  public getCreators = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCreatorsData: Creator[] = await this.creator.getCreators();

      res.status(200).json({ data: findAllCreatorsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorData: Creator = req.body;
      const creatorDetails: Creator = await this.creator.createCreator(creatorData);

      res.status(201).json({ data: creatorDetails, message: 'creator added successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const creatorData: Creator = req.body;
      const updateCreatorData: Creator = await this.creator.updateCreator(id, creatorData);
      res.status(201).json({ data: updateCreatorData, message: 'creator updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public _deleteCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const deleteCreatorData: Creator = await this.creator.deleteCreator(creatorId);

      res.status(200).json({ data: deleteCreatorData, message: 'creator deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getCreatorByAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.creatorId;
      const creatorDetails: Creator = await this.creator.getCreator(creatorId);

      res.status(200).json({ data: creatorDetails });
    } catch (error) {
      next(error);
    }
  };

  public loginOnlyfans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.id;
      const result = await this.login.execute(
        {
          email: req.body.email,
          password: req.body.password,
          proxy: {
            username: '',
            password: '',
          },
        },
        creatorId,
      );

      console.log(result);
      res.status(200).json({ data: {}, message: 'creator logged in, session valid' });
    } catch (error) {
      next(error);
    }
  };

  public generateProxy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.creatorId;
      const proxyAddress = await this.creator.createProxy(creatorId);
      res.status(200).json({ proxy: proxyAddress });
    } catch (error) {
      next(error);
    }
  };

  public getProxyByCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorId: string = req.params.creatorId;
      const findProxy: IProxy = await this.creator.getProxy(creatorId);
      res.status(200).json({ data: findProxy });
    } catch (error) {
      next(error);
    }
  };
  public assignCreatorToEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const creatorsId: any[] = req.body.creatorId;
      const employeeId: any = req.body.employeeId;
      const assignCreator = await this.creator.assignCreatorToEmployee(creatorsId, employeeId);
      res.status(200).json({ data: 'creators added to employees' });
    } catch (error) {
      next(error);
    }
  };

  public searchFilter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryData = req.query;
      const creator = await this.creator.searchCreator(queryData);
      res.status(200).json({ data: creator, message: 'creator fetched successfully' });
    } catch (error) {
      next(error);
    }
  };
}
