/*
  Warnings:

  - Added the required column `level` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `questions` ADD COLUMN `level` ENUM('easy', 'medium', 'hard', 'expert') NOT NULL;
