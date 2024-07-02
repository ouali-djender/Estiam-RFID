import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } else if (req.method === 'POST') {
    const { uid, owner } = req.body;
    const hashedUid = await bcrypt.hash(uid, 10);
    const newCard = await prisma.card.create({
      data: {
        uid: hashedUid,
        owner,
      },
    });
    res.status(201).json(newCard);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
