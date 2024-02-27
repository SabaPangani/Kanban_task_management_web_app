/*
  Warnings:

  - Added the required column `checked` to the `SubTask` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubTask" ADD COLUMN     "checked" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
