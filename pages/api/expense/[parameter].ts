import { NextApiRequest, NextApiResponse } from "next"
import { dayBoundaries } from "../../../utils/dateFns"
import prisma from "../../../utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/expense/:day
    case "GET":
      const { endDay, startDay } = dayBoundaries(
        new Date(req.query.parameter as string)
      )
      const expense = await prisma.expense.findMany({
        where: {
          AND: [{ date: { gte: startDay } }, { date: { lt: endDay } }],
        },
      })
      res.json(expense)
      break
    // GET /api/expense/:id
    case "DELETE":
      const id = req.query.parameter as string
      console.log({ id })
      const deleted = await prisma.expense.delete({ where: { id } })
      res.json(deleted)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
