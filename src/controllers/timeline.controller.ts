import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { TimeLine } from '@/interfaces/timeline.interface';
import { TimelineServices } from '@/services/timeline.service';

interface $conflict {
  message: string;
  success: boolean;
}

export class TimelineController {
  public timeline = Container.get(TimelineServices);

  public createTimelineData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: TimeLine } = await this.timeline.createTimeline(req.body, req.user);
      res.status(200).json({ ack: 1, message: 'Timeline data created succesfully', data: data });
    } catch (error) {
      next(error);
    }
  };

  public getTimelineData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate } = req.params;

      if (startDate) {
        const filteredTimeline = await this.timeline.getTimelineData(startDate);
        res.status(200).json({ ack: 1, message: 'Filtered Timeline ', data: filteredTimeline });
      } else {
        const allTimeline = await this.timeline.getTimelineData();
        res.status(200).json({ ack: 1, message: 'All Timeline Data', data: allTimeline });
      }
    } catch (error) {
      next(error);
    }
  };

  public getTimelineDataAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allTimeline = await this.timeline.getTimelineDataAll(req.user);
      res.status(200).json({ ack: 1, message: 'All Timeline Data', data: allTimeline });
    } catch (error) {
      next(error);
    }
  };

  public deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: TimeLine } = await this.timeline.deleteById(req.params);
      res.status(200).json({ ack: 1, message: 'Timeline data deleted succesfully', data: data });
    } catch (error) {
      next(error);
    }
  };

  public updateTimelineData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: { success: boolean; data: TimeLine } = await this.timeline.updateTimelineData(req.params.timelineId, req.body);
      res.status(200).json({ ack: 1, message: 'Timeline data deleted succesfully', data: data });
    } catch (error) {
      next(error);
    }
  };
}
