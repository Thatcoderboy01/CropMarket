-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('FARMER', 'RETAILER', 'ADMIN') NOT NULL DEFAULT 'FARMER';
