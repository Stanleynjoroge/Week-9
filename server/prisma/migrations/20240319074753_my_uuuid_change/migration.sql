/*
  Warnings:

  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_projectId_fkey`;

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ticket` MODIFY `projectId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Project_id_key` ON `Project`(`id`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
