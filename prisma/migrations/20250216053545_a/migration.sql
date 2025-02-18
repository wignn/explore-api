/*
  Warnings:

  - Made the column `description` on table `Chapter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "description" SET NOT NULL;
