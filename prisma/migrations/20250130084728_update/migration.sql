/*
  Warnings:

  - You are about to drop the column `created_at` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
DROP COLUMN "user_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
