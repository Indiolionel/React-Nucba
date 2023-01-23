/*
  Warnings:

  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_orderId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderId";

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");
