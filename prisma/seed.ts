import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
  await prisma.employee.createMany({
    data: [
      { name: "Yuval", salaryPerHour: 150, active: true },
      { name: "Liron", salaryPerHour: 150, active: true },
      { name: "Nir", salaryPerHour: 170, active: true },
      { name: "Ran", salaryPerHour: 120, active: true },
    ],
  })
  await prisma.investmentType.createMany({
    data: [{ name: "Drink" }, { name: "Food" }, { name: "Advertisement" }],
  })
}

seed()
  .catch((e) => {
    console.log(`error`, e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

export default seed
