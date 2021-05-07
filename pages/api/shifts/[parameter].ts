import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/expense/:day
    case "GET":
      const date = req.query.parameter as string;
      const shifts = await prisma.shift.findMany({
        include: { Employee: true },
        where: {
          startDate: { equals: date },
        },
      });

      res.json(shifts);
      break;
    // GET /api/expense/:id
    case "DELETE":
      const id = req.query.parameter as string;

      const deleted = await prisma.shift.delete({ where: { id } });
      res.json(deleted);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
