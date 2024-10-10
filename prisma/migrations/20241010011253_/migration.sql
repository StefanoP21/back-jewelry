/*
  Warnings:

  - You are about to drop the column `reason` on the `Refund` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Refund` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameContact` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "stock" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "reason",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "name",
ADD COLUMN     "nameContact" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;
