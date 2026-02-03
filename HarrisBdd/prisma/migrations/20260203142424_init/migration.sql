/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `etna_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `logged_in` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token_expiration` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `FirstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Userid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserConsumable" DROP CONSTRAINT "UserConsumable_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPowerUp" DROP CONSTRAINT "UserPowerUp_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserQuizResult" DROP CONSTRAINT "UserQuizResult_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserScore" DROP CONSTRAINT "UserScore_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "etna_id",
DROP COLUMN "logged_in",
DROP COLUMN "token_expiration",
ADD COLUMN     "FirstName" TEXT NOT NULL,
ADD COLUMN     "LastName" TEXT NOT NULL,
ADD COLUMN     "Userid" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Userid");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- AddForeignKey
ALTER TABLE "UserPowerUp" ADD CONSTRAINT "UserPowerUp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsumable" ADD CONSTRAINT "UserConsumable_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizResult" ADD CONSTRAINT "UserQuizResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;
