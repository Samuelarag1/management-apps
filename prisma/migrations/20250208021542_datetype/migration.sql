-- AlterTable
ALTER TABLE `Project` MODIFY `pre_payment` VARCHAR(191) NULL,
    MODIFY `finish_date` VARCHAR(191) NOT NULL,
    MODIFY `initial_date` VARCHAR(191) NOT NULL,
    MODIFY `hosting` VARCHAR(191) NULL,
    MODIFY `cloud_storage` VARCHAR(191) NULL,
    MODIFY `domain` VARCHAR(191) NULL;
