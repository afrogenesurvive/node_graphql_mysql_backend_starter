CREATE TABLE IF NOT EXISTS `user` (
  `id` VARCHAR(45) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `middle_name` VARCHAR(255),
  `full_name` VARCHAR(255),
  `type` VARCHAR(255),
  `subtype` VARCHAR(255),
  `dob` DATETIME NOT NULL,
  `gender` VARCHAR(50),
  `age` INTEGER NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `system_id` VARCHAR(255) NOT NULL,
  `notes` TEXT,
  `role` VARCHAR(255) NOT NULL,
  `logged_in` BOOLEAN,
  `verified` BOOLEAN,
  `verification_code` VARCHAR(255) NOT NULL,
  `verification_type` VARCHAR(255) NOT NULL,
  `reset_code` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `create_time` DATETIME NOT NULL,
  `update_time` DATETIME,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_by` VARCHAR(45),
  `is_deleted` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;