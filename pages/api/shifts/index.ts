import { Shift } from ".prisma/client";
import { format, formatISO } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { EmployeeFormData } from "../../../Components/EmployeesShiftForm";

// POST /api/shifts
// Required fields in body: start, end, employee
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { endDate, endTime, startDate, startTime, worker }: Shift = req.body;

  const result = await prisma.shift.create({
    data: {
      endDate,
      endTime,
      startDate,
      startTime,
      Employee: { connect: { id: worker } },
    },
  });
  res.json(result);
}
