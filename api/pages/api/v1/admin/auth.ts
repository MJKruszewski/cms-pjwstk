import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') return res.status(200).json({});

  if (req.method === 'POST') {
    await post(req, res);
  } else {
    res.status(405).json({ code: 'not-supported' });
  }
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.username !== 'admin' || req.body.password !== 'admin') {
    res.status(401).json({ isAuthorized: false });

    return;
  }

  res.status(200).json({ isAuthorized: true });
};
