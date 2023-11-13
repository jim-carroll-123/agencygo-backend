import { ChatController } from '@/controllers/chat.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class ChatRoute implements Routes {
  public path = '/chat';
  public router = Router();
  public chat = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/chattoken`, this.chat.generateToken);
    this.router.post(`${this.path}/user`, this.chat.createUser);
    this.router.get(`${this.path}/user`, this.chat.fetchAllUsers);
    this.router.delete(`${this.path}/user/:userId`, this.chat.deleteUser);
    this.router.post(`${this.path}/conversation`, this.chat.createConversation);
    // this.router.get(`${this.path}/getAllConversation`, this.chat.getAllConversations);
    this.router.get(`${this.path}/getUserConversation/:userId`, this.chat.getUserConversations);
    this.router.post(`${this.path}/sendmsg/:id`, this.chat.sendMessage);
    this.router.post(`${this.path}/addparticipant/:id`, this.chat.addParticipant);

    this.router.get(`${this.path}/getallconversation`, AuthMiddleware, this.chat.getConversations);
    this.router.get(`${this.path}/getallmsg/:id`, this.chat.getallMessages);
    this.router.get(`${this.path}/getmessage/:cID`, this.chat.getMessages);

    this.router.delete(`${this.path}/deleteconversation/:id`, this.chat.deleteConversation);
    this.router.delete(`${this.path}/deletemsg/:id`, this.chat.deleteMessage);
  }
}
