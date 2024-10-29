/*
  Warnings:

  - You are about to drop the column `productId` on the `Refund` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Refund` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_productId_fkey";

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "productId",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "RefundDetail" (
    "id" SERIAL NOT NULL,
    "refundId" INTEGER NOT NULL,
    "purchaseDetailId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "RefundDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefundDetail" ADD CONSTRAINT "RefundDetail_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefundDetail" ADD CONSTRAINT "RefundDetail_purchaseDetailId_fkey" FOREIGN KEY ("purchaseDetailId") REFERENCES "PurchaseDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
