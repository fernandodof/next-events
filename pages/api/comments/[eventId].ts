import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
        body,
        query: { eventId }
    } = req;

    switch (method) {
        case 'POST': {
            const { email, name, text } = body;

            if (!email.includes('@') || !name?.trim() || !text?.trim()) {
                return res.status(422).json({ message: 'Invalid input.' });
            }

            const comment = {
                id: new Date().toISOString(),
                email,
                name,
                text
            };
            console.log(comment, eventId);
            return res.status(201).json({ message: 'Comment added', comment });
        }
        case 'GET': {
            return res.status(401).json({ message: 'Comment added', comments: [] });
        }
    }

    return res.status(405).json({ message: 'Not allowed' });
}
