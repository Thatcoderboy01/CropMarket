-- DropForeignKey
ALTER TABLE `crop` DROP FOREIGN KEY `Crop_farmerId_fkey`;

-- DropForeignKey
ALTER TABLE `farmer` DROP FOREIGN KEY `Farmer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_cropId_fkey`;

-- DropForeignKey
ALTER TABLE `request` DROP FOREIGN KEY `Request_retailerId_fkey`;

-- DropForeignKey
ALTER TABLE `retailer` DROP FOREIGN KEY `Retailer_userId_fkey`;

-- DropIndex
DROP INDEX `Crop_farmerId_fkey` ON `crop`;

-- DropIndex
DROP INDEX `Request_cropId_fkey` ON `request`;

-- DropIndex
DROP INDEX `Request_retailerId_fkey` ON `request`;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Retailer` ADD CONSTRAINT `Retailer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Crop` ADD CONSTRAINT `Crop_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `Farmer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_retailerId_fkey` FOREIGN KEY (`retailerId`) REFERENCES `Retailer`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_cropId_fkey` FOREIGN KEY (`cropId`) REFERENCES `Crop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
