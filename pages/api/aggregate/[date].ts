import { Prisma } from ".prisma/client";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { ShiftWithWorker } from "../../../utils/shifts";

type SumOfWageProps = {
  shifts: Omit<ShiftWithWorker, "id" | "worker" | "optimistic">[];
};

type SumOfExpenseProp = {
  // wage: { [key: string]: number };
  shifts: Omit<ShiftWithWorker, "id" | "worker" | "optimistic">[];
  expense: (Prisma.PickArray<Prisma.ExpenseGroupByOutputType, "date"[]> & {
    sum: Prisma.ExpenseSumAggregateOutputType;
  })[];
};

type BalanceProp = {
  // wage: { [key: string]: number };
  cost: { [key: string]: number };
  date: string;
};

function sumOfWagePerDay({ shifts }: SumOfWageProps) {
  return shifts.reduce((acc, curr) => {
    const { startDate, startTime, endDate, endTime, Employee: employee } = curr;
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const shiftDuration =
      (endDateTime.valueOf() - startDateTime.valueOf()) / 1000 / 60 / 60; // shift duration in hours
    const wage = shiftDuration * employee.salaryPerHour; //calc total salary
    if (acc[curr.startDate]) {
      const newWage = (acc[curr.startDate] += wage);
      return { ...acc, [curr.startDate]: newWage };
    } else {
      return { ...acc, [curr.startDate]: wage };
    }
  }, {});
}

// combine sum of wage and sum of expense per day
function sumOfCostPerDay({ shifts, expense }: SumOfExpenseProp) {
  const wage = sumOfWagePerDay({ shifts });
  return expense.reduce((acc, curr) => {
    const {
      date,
      sum: { cost },
    } = curr;
    if (acc[date]) {
      acc[date] += cost;
    } else {
      acc[date] = cost;
    }
    return acc;
  }, wage);
}

async function getCosts(date: string) {
  const expense = await prisma.expense.groupBy({
    by: ["date"],
    sum: { cost: true },
    where: {
      AND: [
        {
          date: { gte: format(startOfWeek(new Date(date)), "yyyy-MM-dd") },
        },
        { date: { lte: format(endOfWeek(new Date(date)), "yyyy-MM-dd") } },
      ],
    },
  });
  const shifts = await prisma.shift.findMany({
    where: {
      AND: [
        {
          startDate: { gte: format(startOfWeek(new Date(date)), "yyyy-MM-dd") },
        },
        { startDate: { lte: format(endOfWeek(new Date(date)), "yyyy-MM-dd") } },
      ],
    },
    select: {
      endDate: true,
      endTime: true,
      startDate: true,
      startTime: true,
      Employee: true,
    },
  });
  return sumOfCostPerDay({ shifts, expense });
}

async function getBalanceAndIncome({ cost, date }: BalanceProp) {
  const profit = await prisma.profit.groupBy({
    by: ["date"],
    sum: {
      income: true,
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
  const balance = profit.reduce((acc, curr) => {
    const {
      date,
      sum: { income },
    } = curr;
    if (acc[date]) {
      acc[date] -= income;
    } else {
      acc[date] = income;
    }
    return acc;
  }, cost);

  const income = profit.reduce(
    (acc, curr) => ({ ...acc, [curr.date]: curr.sum.income }),
    {}
  );
  return { balance, income };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/aggregate/:day
    case "GET":
      const date = req.query.date as string;
      const cost = await getCosts(date);
      const { balance, income } = await getBalanceAndIncome({ cost, date });

      res.json({ income, cost, balance });
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
