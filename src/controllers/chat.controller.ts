import { NextFunction, Request, Response } from 'express';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SECRET_KEY, TWILIO_API_KEY } from '@config';
import twilio from 'twilio';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

let io: Socket;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const initializeWebSocket = (httpServer: HttpServer) => {
  io = new Socket(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connect', socket => {
    console.log(11);
    global.chatSocket = socket;
    const clientIp = socket.request.connection.remoteAddress;
    console.log('clientIp', clientIp);
    console.log('Client connected');

    socket.on('join', conversationId => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined room ${conversationId}`);
    });
  });
};

export const getSocketIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

export class ChatController {
  public generateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AccessToken = twilio.jwt.AccessToken;
      const ChatGrant = AccessToken.ChatGrant;

      // const accountSid = process.env.TWILIO_ACCOUNT_SID;
      // const apiKeySid = process.env.TWILIO_API_KEY;

      // const userData = req.body;
      // const { tokenData } = await this.auth.generatetoken(userData);

      const identity = req.body.email;
      // Create an access token
      const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_SECRET_KEY, {
        identity: identity,
      });
      // Add a Chat grant to the token
      const chatGrant = new ChatGrant();
      accessToken.addGrant(chatGrant);

      // Serialize the token to a JWT
      const token = accessToken.toJwt();
      // const tokenData = createToken(accessToken);
      res.status(200).json({
        // data: { tokenData, accessToken: token },
        data: token,
        message: 'token get',
      });
    } catch (error) {
      next(error);
    }
  };

  public createToken = (username: any, serviceSid: any) => {
    try {
      const AccessToken = twilio.jwt.AccessToken;
      const ChatGrant = AccessToken.ChatGrant;

      const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_SECRET_KEY, { identity: username });

      const chatGrant = new ChatGrant({
        serviceSid: serviceSid,
      });

      token.addGrant(chatGrant);

      return token.toJwt();
    } catch (error) {
      console.log(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userEmail = req.body.email;
      const data = await client.conversations.v1.users.create({ identity: userEmail });
      res.status(200).json({
        user: data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };
  public createConversation = async (req: Request, res: Response) => {
    try {
      // const user = await client.conversations.v1.users(req.body.email).fetch();
      const { friendlyName, username } = req.body;
      const conversation = await client.conversations.v1.conversations.create({
        friendlyName: friendlyName,
      });
      // const token = this.createToken(username, conversation.chatServiceSid);

      // req.header['username'] = username;
      const participant = await client.conversations.v1.conversations(conversation.sid).participants.create({ identity: username });

      res.status(200).json({
        conversation,
        participant,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public addParticipant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

      const { username } = req.body;
      const conversationSid = req.params.id;

      try {
        const conversation = await client.conversations.v1.conversations.get(conversationSid).fetch();

        if (username && conversationSid) {
          // req.header['token'] = this.createToken(username, conversation.chatServiceSid);
          // req.header['username'] = username;

          const participant = await client.conversations.v1.conversations(conversationSid).participants.create({ identity: username });

          res.send({ conversation, participant });
        } else {
          next({ message: 'Missing username or conversation Sid' });
        }
      } catch (error) {
        next({ error, message: 'There was a problem adding a participant' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public sendMessage = async (req: Request, res: Response) => {
    try {
      const message = await client.conversations.v1.conversations(req.params.id).messages.create({
        author: req.body.email,
        body: req.body.msg,
      });
      res.status(200).json({
        data: message,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public getConversations = async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 20;
      const arr = [];
      const conversations = await client.conversations.v1.conversations.list({ limit: limit });

      conversations.forEach(c => {
        arr.push(c);
      });

      res.status(200).json({
        arr,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public getallMessages = async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 20;
      const arr = [];

      const messages = await client.conversations.v1.conversations(req.params.id).messages.list({ limit: limit });

      messages.forEach(m => arr.push(m));

      res.status(200).json({
        data: {
          total: arr.length,
          messages: arr,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public deleteConversation = async (req: Request, res: Response) => {
    try {
      const c = await client.conversations.v1.conversations(req.params.id).remove();
      res.status(200).json({
        data: c,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public deleteMessage = async (req: Request, res: Response) => {
    try {
      const messageId = req.query.msgId;
      const c = await client.conversations.v1.conversations(req.params.id).messages(messageId).remove();
      res.status(200).json({
        data: c,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };
}
