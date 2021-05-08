import { format, startOfWeek, endOfWeek } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/expense/aggregate/:day
    case "GET":
      const date = req.query.date as string;
      const expense = await prisma.expense.groupBy({
        by: ["date"],
        sum: {
          cost: true,
        },
        where: {
          AND: [
            {
              date: { gte: format(startOfWeek(new Date(date)), "yyyy-MM-dd") },
            },
            { date: { lte: format(endOfWeek(new Date(date)), "yyyy-MM-dd") } },
          ],
        },
      });

      res.json(expense);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
