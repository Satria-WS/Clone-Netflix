import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST' || req.method === 'GET') {
    try {
      await prisma.movie.create({
        data: {
          title: "Big Buck Bunny",
          description: "Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png",
          genre: "Comedy",
          duration: "10 minutes",
        },
      });
      res.status(200).json({ message: 'Data seeded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}