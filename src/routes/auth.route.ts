import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto, true), this.auth.signUp);
    this.router.post(`${this.path}login`, ValidationMiddleware(LoginUserDto, true), this.auth.logIn);
    this.router.get(`${this.path}verify`, AuthMiddleware, this.auth.verify);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
    this.router.post(`${this.path}forgot-password`, this.auth.forgotPassword);
    this.router.post(`${this.path}twiliotoken`, this.auth.generatetwiliotoken);
  }
}
