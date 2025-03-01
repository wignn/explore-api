/*
  Warnings:

  - Added the required column `chapterNum` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('English', 'Japanese', 'Korean');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ongoing', 'Completed', 'Drop');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'Korean',
ADD COLUMN     "realaseDate" INTEGER,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Ongoing';

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "chapterNum" INTEGER NOT NULL;
