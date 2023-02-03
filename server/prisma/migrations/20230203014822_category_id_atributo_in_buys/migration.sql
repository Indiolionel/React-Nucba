/*
  Warnings:

  - You are about to drop the column `category` on the `Buy` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Buy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buy" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;
