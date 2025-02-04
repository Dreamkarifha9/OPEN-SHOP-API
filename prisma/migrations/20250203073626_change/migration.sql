/*
  Warnings:

  - You are about to drop the column `imageKey` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductOnOrder` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `ProductOnOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `ProductOnOrder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_key` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnOrder" DROP CONSTRAINT "ProductOnOrder_productId_fkey";

-- DropIndex
DROP INDEX "ProductOnOrder_productId_key";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "imageKey",
DROP COLUMN "productId",
ADD COLUMN     "image_key" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductOnOrder" DROP COLUMN "productId",
DROP COLUMN "totalPrice",
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductOnOrder_product_id_key" ON "ProductOnOrder"("product_id");

-- AddForeignKey
ALTER TABLE "ProductOnOrder" ADD CONSTRAINT "ProductOnOrder_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
