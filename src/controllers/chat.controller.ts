import { Request, Response } from 'express';
const dotenv = require('dotenv');

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKeySecret = process.env.TWILIO_SECRET_KEY;
const apiKeySid = process.env.TWILIO_API_KEY;

const client = require('twilio')(accountSid, authToken);

export class ChatController {
  public generateToken = async (req: Request, res: Response) => {
    try {
      const AccessToken = require('twilio').jwt.AccessToken;
      const ChatGrant = AccessToken.ChatGrant;

      // const accountSid = process.env.TWILIO_ACCOUNT_SID;
      // const apiKeySid = process.env.TWILIO_API_KEY;

      // const userData: User = req.body;
      // const { tokenData } = await this.auth.generatetoken(userData);

      const identity = req.body.email;
      // Create an access token
      const accessToken = new AccessToken(accountSid, apiKeySid, apiKeySecret, {
        identity: identity,
      });
      // Add a Video grant to the token
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
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      // const accountSid = process.env.TWILIO_ACCOUNT_SID;
      // const authToken = process.env.TWILIO_AUTH_TOKEN;
      // const client = require('twilio')(accountSid, authToken);
      console.log('=====', client);
      const data = client.conversations.v1.users
        .create({ identity: 'your_user_identity' })
        .then(user => {
          console.log('----------', user.sid);
          res.status(200).json({
            user,
          });
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public createConversation = async (req: Request, res: Response) => {
    try {
      client.conversations.v1
        .users(req.body.email)
        .fetch()
        .then(user => {
          client.conversations.v1.conversations
            .create({ identity: user.identity, friendlyName: req.body.name })
            .then(conversation => {
              res.status(200).json({
                conversation,
              });
              // client.conversations.v1.conversations(conversation.sid)
              //     .participants
              //     .create({
              //         'messagingBinding.address': '+918596857423',
              //         // 'messagingBinding.proxyAddress': process.env.TWILIO_PHONE_NUMBER
              //     })
              //     .then(participant => console.log(participant))
              //     .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error,
      });
    }
  };

  public sendMessage = async (req: Request, res: Response) => {
    client.conversations.v1
      .conversations(req.params.id)
      .messages.create({ author: req.body.email, body: req.body.msg })
      .then(message => {
        return res.status(200).json({
          data: message,
        });
      })
      .catch(error => console.error(error));
  };

  public getConversations = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 20;
    const arr = [];
    client.conversations.v1.conversations
      .list({limit: limit })
      .then(conversations => {
        conversations.forEach(c => {
          arr.push(c);
        });
        return res.status(200).json({
          total: arr.length,
          messages: arr,
        });
      })
      .catch(error => console.error(error));
  };

  public getallMessages = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 20;
    const arr = [];

    client.conversations.v1.conversations(req.params.id)
      .messages
      .list({ limit: limit})
      .then(messages => {
        messages.forEach(m => arr.push(m));

        return res.status(200).json({
          data: {
            total: arr.length,
            messages: arr,
          },
        });
      })
      .catch(error => console.error(error));
  };

  public deleteConversation = async (req: Request, res: Response) => {
    client.conversations.v1
      .conversations(req.params.id)
      .remove()
      .then(c => {
        return res.status(200).json({
          data: c,
        });
      })
      .catch(error => console.error(error));
  };

  public deleteMessage = async (req: Request, res: Response) => {
    client.conversations.v1
      .conversations(req.params.id)
      .messages(req.query.msgId)
      .remove()
      .then(c => {
        return res.status(200).json({
          data: c,
        });
      })
      .catch(error => console.error(error));
  };
}
