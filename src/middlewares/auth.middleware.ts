import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/users.model';

const getAuthorization = (req: RequestWithUser) => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.body.newInvite) {
    return next();
  }

  try {
    const Authorization = getAuthorization(req);
    if (Authorization) {
      const { _id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const findUser = await UserModel.findById(_id);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export const isAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.body.newInvite) {
    return next();
  }
  try {
    if (req?.user?.isAdmin) {
      next();
    } else {
      next(new HttpException(401, 'Unauthorized'));
    }
  } catch (error) {
    next(new HttpException(401, 'Unauthorized'));
  }
};

export const isManagerOrAdminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req?.user?.role === 'manager' || req?.user?.role === 'admin') {
      next();
    } else {
      next(new HttpException(401, 'Unauthorized'));
    }
  } catch (error) {
    next(new HttpException(401, 'Unauthorized'));
  }
};
