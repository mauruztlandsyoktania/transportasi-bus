-- CreateTable
CREATE TABLE `Bus` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fromCity` VARCHAR(191) NOT NULL,
    `toCity` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `seats` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
