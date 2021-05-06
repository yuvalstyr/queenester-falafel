import { NextApiRequest, NextApiResponse } from "next"
import { startOfISODay, dayBoundaries } from "../../../utils/dateFns"
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
      const shifts = await prisma.shift.findMany({
        include: { Employee: true },
        where: {
          AND: [{ start: { gte: startDay } }, { start: { lt: endDay } }],
        },
      })

      res.json(shifts)
      break
    // GET /api/expense/:id
    case "DELETE":
      const id = req.query.parameter as string
      console.log(`id`, id)
      const deleted = await prisma.shift.delete({ where: { id } })
      res.json(deleted)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
