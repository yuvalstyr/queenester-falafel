/*
  Warnings:

  - You are about to drop the `ExpenseType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profit" DROP CONSTRAINT "Profit_expenseTypeId_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "investmentTypeId" TEXT;

-- AlterTable
ALTER TABLE "Profit" ADD COLUMN     "investmentTypeId" TEXT;

-- DropTable
DROP TABLE "ExpenseType";

-- CreateTable
CREATE TABLE "InvestmentType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("investmentTypeId") REFERENCES "InvestmentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit" ADD FOREIGN KEY ("investmentTypeId") REFERENCES "InvestmentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
