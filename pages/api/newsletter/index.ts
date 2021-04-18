import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST') {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(422).json({ message: 'Invalid email address.' });
        }

        console.log(email);
        return res.status(201).json({ message: 'Signed up' });
    }

    return res.status(405).json({ message: 'Not allowed' });
}
