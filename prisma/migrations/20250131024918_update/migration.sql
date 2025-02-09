/*
  Warnings:

  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "userName",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;
