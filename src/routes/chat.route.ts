import { ChatController } from "@/controllers/chat.controller";
import { Routes } from "@interfaces/routes.interface";
import { Router } from "express";

export class ChatRoute implements Routes{
    public path = '/chat';
    public router = Router();
    public chat = new ChatController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/chattoken`,this.chat.generateToken);
        this.router.post(`${this.path}/user`,this.chat.createUser);
        this.router.post(`${this.path}/conversation`,this.chat.createConversation);
        this.router.post(`${this.path}/sendmsg/:id`,this.chat.sendMessage);

        this.router.get(`${this.path}/getallconversation`,this.chat.getConversations);
        this.router.get(`${this.path}/getallmsg/:id`,this.chat.getallMessages);
        this.router.delete(`${this.path}/deleteconversation/:id`,this.chat.deleteConversation);
    }
}