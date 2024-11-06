/*
  Warnings:

  - You are about to drop the column `razonSocial` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `bill` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `PurchaseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "bill" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseDetail" ADD COLUMN     "profit" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "razonSocial",
ADD COLUMN     "companyName" TEXT NOT NULL;
