-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('FARMER', 'RETAILER', 'ADMIN', 'BLOCKED') NOT NULL DEFAULT 'FARMER';
