import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../utils/prisma"

export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const employees = await prisma.employee.findMany()
  res.json(employees)
}
