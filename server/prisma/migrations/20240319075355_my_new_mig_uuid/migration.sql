/*
  Warnings:

  - You are about to drop the column `id` on the `project` table. All the data in the column will be lost.
  - Added the required column `_id` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_projectId_fkey`;

-- DropIndex
DROP INDEX `Project_id_key` ON `project`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `id`,
    ADD COLUMN `_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`_id`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
