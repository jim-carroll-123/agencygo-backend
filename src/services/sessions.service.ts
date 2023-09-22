import { HttpException } from '@/exceptions/httpException';
import { Session, SessionStatus, SessionType } from '@/interfaces/sessions.interface';
import { SessionModel } from '@/models/sessions.model';
import { Service } from 'typedi';

@Service()
export class SessionsService {
  // get sessions by creatorId and type
  public async getSessionByCreatorId(creatorId: string, type: SessionType) {
    try {
      const sessions = await SessionModel.findOne({ creatorId, type });
      if (!sessions) throw new HttpException(409, "Sessions doesn't exist");
      return sessions;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      if (error.message) {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  // create a session
  public async createSession(sessionData: Session) {
    try {
      // check if creator has a session
      const session = await SessionModel.where({ creatorId: sessionData.creatorId, type: sessionData.type });
      if (session.length > 0) {
        // delete old session
        session?.forEach(async element => {
          await SessionModel.findByIdAndDelete(element._id);
        });
      }
      const createdSession = new SessionModel(sessionData);
      return await createdSession.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }

  // active session server
  public async activeSessionServer(sessionId: string, url: string) {
    try {
      const session = await SessionModel.findOne({ _id: sessionId });
      if (!session) throw new HttpException(409, "Sessions doesn't exist");
      await SessionModel.findByIdAndUpdate(
        {
          _id: session._id,
        },
        {
          status: SessionStatus.Active,
          url,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(400, error.message);
      }
      if (error.message) {
        throw new HttpException(400, error.message);
      }
      throw new HttpException(500, 'Internal Server Error');
    }
  }
}
