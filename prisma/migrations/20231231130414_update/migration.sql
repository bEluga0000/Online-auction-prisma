-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "playersName" TEXT[] DEFAULT ARRAY[]::TEXT[];
