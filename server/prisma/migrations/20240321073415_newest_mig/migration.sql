/*
  Warnings:

  - The primary key for the `ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_assignedtickets` DROP FOREIGN KEY `_AssignedTickets_A_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_ticketId_fkey`;

-- AlterTable
ALTER TABLE `_assignedtickets` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `comment` MODIFY `ticketId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ticket` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AssignedTickets` ADD CONSTRAINT `_AssignedTickets_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
