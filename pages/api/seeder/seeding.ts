import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../../movies.json";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || req.method === "GET") {
    try {
      for (const movie of jsonData) {
        const exist = await prisma.movie.findMany({
          where: {
            title: movie.title,
          },
        });

        if (!exist) {
          return res.status(400).json({ message: "Movie already exist" });
        } else {
          await prisma.movie.create({
            data: movie,
          });
        }
      }
      res.status(200).json({ message: "Data seeded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
