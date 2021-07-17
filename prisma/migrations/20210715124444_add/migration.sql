/*
  Warnings:

  - Made the column `investmentTypeId` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `investmentTypeId` on table `Profit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "investmentTypeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profit" ALTER COLUMN "investmentTypeId" SET NOT NULL;
