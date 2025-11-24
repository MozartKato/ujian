/*
  Warnings:

  - A unique constraint covering the columns `[session_id,question_id]` on the table `session_answers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `end_date` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('ONGOING', 'SUBMITTED', 'TIMEOUT') NOT NULL DEFAULT 'ONGOING';

-- CreateIndex
CREATE UNIQUE INDEX `session_answers_session_id_question_id_key` ON `session_answers`(`session_id`, `question_id`);
