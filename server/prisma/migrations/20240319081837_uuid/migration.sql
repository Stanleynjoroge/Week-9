/*
  Warnings:

  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `project` table. All the data in the column will be lost.
  - Added the required column `_id` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_projectId_fkey`;

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`_id`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
