import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../utils/prisma"

export default async function handle(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const types = await prisma.investmentType.findMany()
  res.json(types)
}
