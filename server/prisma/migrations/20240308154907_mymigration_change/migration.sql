/*
  Warnings:

  - Made the column `startDate` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `ticket` MODIFY `status` ENUM('TO_DO', 'ONGOING', 'RESOLVED') NOT NULL DEFAULT 'TO_DO';
