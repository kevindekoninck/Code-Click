/*
  Warnings:

  - The `student_type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "student_type",
ADD COLUMN     "student_type" TEXT[];
