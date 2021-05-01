import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { findDcument, getMongoClient, insertDocument } from '../../../util/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
        body,
        query: { eventId }
    } = req;

    let client: MongoClient;

    try {
        client = await getMongoClient();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to connect to the database' });
    }

    switch (method) {
        case 'POST': {
            const { email, name, text } = body;

            if (!email.includes('@') || !name?.trim() || !text?.trim()) {
                return res.status(422).json({ message: 'Invalid input.' });
            }

            const comment = {
                email,
                name,
                text,
                eventId
            };

            try {
                const result = await insertDocument(client, 'comments', { ...comment });
                return res
                    .status(201)
                    .json({ message: 'Comment added', comment: { ...comment, id: result.insertedId } });
            } catch (error) {
                return res.status(500).json({ message: 'Failed to save comment' });
            }
        }
        case 'GET': {
            try {
                const comments = await findDcument(client, 'comments', { eventId }, { _id: -1 });
                return res.status(200).json(comments);
            } catch (error) {
                return res.status(500).json({ message: 'Failed to get comments' });
            }
        }
    }

    return res.status(405).json({ message: 'Not allowed' });
}
