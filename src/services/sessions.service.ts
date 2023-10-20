import { HttpException } from '@/exceptions/httpException';
import { Session, SessionStatus, SessionType } from '@/interfaces/sessions.interface';
import { SessionModel } from '@/models/sessions.model';
import Container, { Service } from 'typedi';
import { StorageService } from './storage.service';
import fs from 'fs';

@Service()
export class SessionsService {
  private storage = Container.get(StorageService);
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
          await SessionModel.findByIdAndDelete(element._id, {}, (err, doc) => {
            if (!err && doc) {
              if (doc.key && doc.bucket) {
                console.log('deleting file');
                this.storage.deleteFile(doc.key, doc.bucket);
              }
              if (doc.type === SessionType.Server) {
                const isPathExist = fs.existsSync(`./temp/${doc._id}`);
                if (isPathExist) {
                  fs.rmSync(`./temp/${doc._id}`, { recursive: true });
                }
              }
            }
          });
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
  public async activeSessionServer(sessionId: string, file: Buffer | Blob, cleanUp: () => void) {
    try {
      const session = await SessionModel.findOne({ _id: sessionId });
      if (!session) throw new HttpException(409, "Sessions doesn't exist");
      const cloudFile = await this.storage.uploadFile(file, `server-${sessionId}.zip`, true);

      cleanUp();
      return newSession;
    } catch (error) {
      cleanUp();
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
