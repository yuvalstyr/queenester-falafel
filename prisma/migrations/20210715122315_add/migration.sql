/*
  Warnings:

  - Added the required column `expenseTypeId` to the `Profit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profit" ADD COLUMN     "expenseTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profit" ADD FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
