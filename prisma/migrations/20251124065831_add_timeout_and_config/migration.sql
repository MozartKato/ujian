/*
  Warnings:

  - Added the required column `duration` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_questions` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Made the column `end_date` on table `sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `subject_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_questions` INTEGER NOT NULL,
    MODIFY `end_date` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `sessions_subject_id_idx` ON `sessions`(`subject_id`);

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
