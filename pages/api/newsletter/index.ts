import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { getMongoClient, insertDocument } from '../../../util/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(422).json({ message: 'Invalid email address.' });
        }

        let client: MongoClient;

        try {
            client = await getMongoClient();
        } catch (error) {
            return res.status(500).json({ message: 'Failed to connect to the database' });
        }

        try {
            await insertDocument(client, 'newsletter', { email });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to subscribe to the newsletter' });
        }

        return res.status(201).json({ message: 'Signed up' });
    }

    return res.status(405).json({ message: 'Not allowed' });
}
