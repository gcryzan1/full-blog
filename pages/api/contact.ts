import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
// import { dbConnection } from '../../env';

interface Request extends NextApiRequest {
  body: {
    email: string;
    name: string;
    message: string;
  };
}

type Message = {
  id?: string;
  email: string;
  message: string;
  name: string;
};

const handler = async (req: Request, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      !name.trim() ||
      !message ||
      !message.trim()
    ) {
      res.status(422).json({
        message: 'Invalid input.'
      });
      return;
    }

    const newMessage: Message = {
      email,
      message,
      name
    };

    let client: MongoClient;

    const dbConnection = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.nvg9ll0.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(dbConnection);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();
    res.status(201).json({ message: 'Successfully stored message!' });
  }
};

export default handler;
