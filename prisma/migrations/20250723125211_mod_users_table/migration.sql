/*
  Warnings:

  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'active', 'deactivated');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expiresIn" INTEGER,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "verificationCode" INTEGER,
ADD COLUMN     "verificationDate" TIMESTAMP(3);
