import { addDays, startOfDay } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { dayBoundaries } from "../../../utils/dateFns";
import prisma from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/expense/:day
    case "GET":
      const { endDay, startDay } = dayBoundaries(
        new Date(req.query.parameter as string)
      );
      const date = new Date(req.query.parameter as string);
      const expense = await prisma.expense.findMany({
        where: {
          AND: [
            { date: { gte: startOfDay(date) } },
            { date: { lt: addDays(startOfDay(date), 1) } },
          ],
        },
      });
      console.log(
        `/api/expense/:${startOfDay(date)} -> ${addDays(startOfDay(date), 1)}`,
        { expense }
      );
      res.json(expense);
      break;
    // GET /api/expense/:id
    case "DELETE":
      const id = req.query.parameter as string;
      const deleted = await prisma.expense.delete({ where: { id } });
      res.json(deleted);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
