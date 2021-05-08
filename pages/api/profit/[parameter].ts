import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/profit/:day
    case "GET":
      const date = req.query.parameter as string;

      const profit = await prisma.profit.findMany({
        where: {
          date: { equals: date },
        },
      });

      res.json(profit);
      break;
    // GET /api/profit/:id
    case "DELETE":
      const id = req.query.parameter as string;
      const deleted = await prisma.profit.delete({ where: { id } });
      res.json(deleted);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
