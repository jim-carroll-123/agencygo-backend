import { NextFunction, Request, Response } from 'express';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SECRET_KEY, TWILIO_API_KEY } from '@config';
import twilio, { Twilio } from 'twilio';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import { Service } from 'typedi';
import * as axios from 'axios';

import { TwilioModel } from '@/models/twilio.model';
import { UserModel } from '@/models/users.model';
import { email } from 'envalid';

let io: Socket;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const twilioBaseUrl = 'https://conversations.twilio.com/v1';

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

export const initializeChatUser = async (email: string): Promise<string> => {
  const data = await client.conversations.v1.users.create({ identity: email });
  return data.sid;
};

export const getSocketIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};
@Service()
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
      const friendlyname = req.body.name;
      const data = await client.conversations.v1.users.create({ identity: userEmail, friendlyName: friendlyname });
      await UserModel.updateOne({ email: userEmail }, { $set: { twilioUserId: data.sid } });
      res.status(201).json({
        message: 'User created successfully',
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  };

  public fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await client.conversations.v1.users.list({ limit: 20 });
      const userSids = users.map(user => user.sid);

      res.status(200).json({
        users: userSids,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 'Error fetching users',
      });
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId; // Assuming the user ID is part of the URL parameters
      await client.conversations.v1.users(userId).remove();
      res.status(200).json({
        message: 'User deleted successfully',
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
      const { friendlyName, userEmail } = req.body;
      const conversation = await client.conversations.v1.conversations.create({
        friendlyName: friendlyName,
      });
      const finduser = await UserModel.findOne({ email: userEmail });
      if (!finduser.twilioUserId) {
        const data = await client.conversations.v1.users.create({ identity: userEmail });
        await UserModel.updateOne({ email: userEmail }, { $set: { twilioUserId: data.sid } });
      }
      const participant = await client.conversations.v1.conversations(conversation.sid).participants.create({ identity: userEmail });
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

  public getAllConversations = async (req: Request, res: Response) => {
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

  public getConversations = async (req: Request, res: Response) => {
    try {
      const arr = [];
      const userData = req.user;
      const response = await axios.get(`${twilioBaseUrl}/Users/${userData.twilioUserId}/Conversations`, {
        auth: {
          username: TWILIO_ACCOUNT_SID,
          password: TWILIO_AUTH_TOKEN,
        },
      });
      const data = response.data.conversations;
      data.forEach(c => {
        arr.push({
          friendlyName: c.friendly_name,
          cID: c.conversation_sid,
          url: c.url,
          conversationState: c.conversation_state,
          links: c.links,
        });
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

  public getMessages = async (req: Request, res: Response) => {
    try {
      const arr = [];
      const userData = req.user;
      const cID = req.params.cID;
      // https://conversations.twilio.com/v1/Conversations/CHe54af793d61d48d38080d070bba9f39b/Messages
      const response = await axios.get(`${twilioBaseUrl}/Conversations/${cID}/Messages`, {
        auth: {
          username: TWILIO_ACCOUNT_SID,
          password: TWILIO_AUTH_TOKEN,
        },
      });
      const data = response.data.messages;
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  public getUserConversations = async (req: Request, res: Response) => {
    try {
      const userSid = req.params.userSid; // Extract user SID from request parameters

      // Fetch conversations for the user
      const conversations = await client.conversations.v1.users(`${userSid}`).userConversations.list({ limit: 20 });

      res.status(200).json({
        conversations,
      });
    } catch (error) {
      console.error(error);
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
