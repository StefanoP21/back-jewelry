/*
  Warnings:

  - You are about to drop the column `OrderId` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `PurchaseId` on the `PurchaseDetail` table. All the data in the column will be lost.
  - You are about to drop the column `PurchaseId` on the `Refund` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseId` to the `PurchaseDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseId` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_OrderId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseDetail" DROP CONSTRAINT "PurchaseDetail_PurchaseId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_PurchaseId_fkey";

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "OrderId",
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseDetail" DROP COLUMN "PurchaseId",
ADD COLUMN     "purchaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "PurchaseId",
ADD COLUMN     "purchaseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
