/*
  Warnings:

  - Added the required column `userDNI` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDNI` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "userDNI" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Refund" ADD COLUMN     "userDNI" TEXT NOT NULL;
