import { Employee, Shift, Prisma } from ".prisma/client"
import { endOfWeek, format, startOfWeek } from "date-fns"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../utils/prisma"

type SumOfWageProps = {
  shifts: (Omit<Shift, "id" | "optimistic" | "worker"> & {
    Employee: Employee
  })[]
}

type ExpenseGrouped = Prisma.PickArray<
  Prisma.ExpenseGroupByOutputType,
  "date"[]
> & {
  _sum: {
    cost: number
  }
}

type BalanceProp = {
  cost: { [key: string]: number }
  date: string
}

async function getCosts(date: string) {
  const lowWeekConstraint = format(startOfWeek(new Date(date)), "yyyy-MM-dd")
  const highWeekConstraint = format(endOfWeek(new Date(date)), "yyyy-MM-dd")
  const expense = await prisma.expense.groupBy({
    by: ["date"],
    where: {
      AND: [
        { date: { gte: lowWeekConstraint } },
        { date: { lte: highWeekConstraint } },
      ],
    },
    _sum: {
      cost: true,
    },
  })
  const shifts = await prisma.shift.findMany({
    where: {
      AND: [
        { startDate: { gte: lowWeekConstraint } },
        { startDate: { lte: highWeekConstraint } },
      ],
    },
    select: {
      endDate: true,
      endTime: true,
      startDate: true,
      startTime: true,
      Employee: true,
    },
  })
  const wage = sumOfWagePerDay({ shifts })
  const costs = expense.reduce((acc, curr) => {
    const {
      date,
      _sum: { cost },
    } = curr
    if (acc[date]) {
      acc[date] += cost
    } else {
      acc[date] = cost
    }
    return acc
  }, wage)
  const employeeWeeklyCost = employeeSumOfWagePerWeek({ shifts })
  return { cost: costs, employeeWeeklyCost }
}

function sumOfWagePerDay({ shifts }: SumOfWageProps) {
  return shifts.reduce((acc, curr) => {
    const { startDate, startTime, endDate, endTime, Employee: employee } = curr
    const startDateTime = new Date(`${startDate}T${startTime}`)
    const endDateTime = new Date(`${endDate}T${endTime}`)
    const shiftDuration =
      (endDateTime.valueOf() - startDateTime.valueOf()) / 1000 / 60 / 60 // shift duration in hours
    const wage = shiftDuration * employee.salaryPerHour // calc total salary
    if (acc[curr.startDate]) {
      const newWage = (acc[curr.startDate] += wage)
      return { ...acc, [curr.startDate]: newWage }
    } else {
      return { ...acc, [curr.startDate]: wage }
    }
  }, {})
}

function employeeSumOfWagePerWeek({ shifts }: SumOfWageProps) {
  return shifts.reduce((acc, curr) => {
    const { startDate, startTime, endDate, endTime, Employee: employee } = curr
    const startDateTime = new Date(`${startDate}T${startTime}`)
    const endDateTime = new Date(`${endDate}T${endTime}`)
    const shiftDuration =
      (endDateTime.valueOf() - startDateTime.valueOf()) / 1000 / 60 / 60 // shift duration in hours
    const wage = shiftDuration * employee.salaryPerHour // calc total salary
    if (acc[employee.name]) {
      const newWage = (acc[employee.name].wage += wage)
      const newCount = acc[employee.name].count + 1
      const newTotal = { wage: newWage, count: newCount }
      return { ...acc, [employee.name]: newTotal }
    } else {
      return { ...acc, [employee.name]: { wage, count: 1 } }
    }
  }, {})
}

async function getBalanceAndIncome({ cost, date }: BalanceProp) {
  const costObj = { ...cost }

  const profit = await prisma.profit.groupBy({
    by: ["date"],
    _sum: {
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
  })
  const balance = profit.reduce((acc, curr) => {
    const {
      date,
      _sum: { income },
    } = curr
    if (acc[date]) {
      acc[date] = -1 * acc[date] + income
    } else {
      acc[date] = income
    }
    return acc
  }, costObj)

  const income = profit.reduce(
    (acc, curr) => ({ ...acc, [curr.date]: curr._sum.income }),
    {} as { [key: string]: number }
  )
  return { balance, income }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // GET /api/aggregate/:day
    case "GET":
      const date = req.query.date as string
      const { cost, employeeWeeklyCost } = await getCosts(date)

      const { balance, income } = await getBalanceAndIncome({ cost, date })
      res.json({ income, cost, balance, employeeWeeklyCost })
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}
