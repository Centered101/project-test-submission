CREATE TABLE `test-database`.`users` (
    `id` INT(50) NULL DEFAULT NULL AUTO_INCREMENT,
    `username` VARCHAR(40) NULL DEFAULT NULL,
    `email` VARCHAR(40) NULL DEFAULT NULL,
    `password` VARCHAR(97) NULL DEFAULT NULL,
    `salt_account` VARCHAR(256) NULL DEFAULT NULL,
    `role_account` VARCHAR(6) NULL DEFAULT NULL,
    `images` VARCHAR(50) NOT NULL,
    `login_count` INT(1) NOT NULL,
    `lock_account` INT(1) NOT NULL,
    `ban_account` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;