/*
  Warnings:

  - You are about to drop the column `posion` on the `Player` table. All the data in the column will be lost.
  - Added the required column `role` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Batsman', 'Bowler', 'Allrounder', 'WicketKeeper');

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "posion",
ADD COLUMN     "role" "Role" NOT NULL;
