/*
  Warnings:

  - You are about to alter the column `lava_coins` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `current_clicks` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `fairplay_points` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lava_coins" SET DATA TYPE INTEGER,
ALTER COLUMN "current_clicks" SET DATA TYPE INTEGER,
ALTER COLUMN "fairplay_points" SET DATA TYPE INTEGER;
