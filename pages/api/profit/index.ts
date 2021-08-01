import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../utils/prisma"

// POST /api/expense
// Required fields in body: date, name, cost
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date, name, income, investmentTypeId: id  } = req.body

  const result = await prisma.profit.create({
    data: {
      date,
      name,
      InvestmentType:{connect:{id}},
      income: +income,
    },
  })

  res.json(result)
}
