/*
  Warnings:

  - The `pre_payment` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `finish_date` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hosting` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `domain` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "pre_payment",
ADD COLUMN     "pre_payment" DECIMAL(65,30),
DROP COLUMN "finish_date",
ADD COLUMN     "finish_date" TIMESTAMP(3),
DROP COLUMN "hosting",
ADD COLUMN     "hosting" TIMESTAMP(3),
DROP COLUMN "domain",
ADD COLUMN     "domain" TIMESTAMP(3);
