CREATE TABLE IF NOT EXISTS `show` (
  `id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `production_company_id` VARCHAR(45),
  `age_recommendation` VARCHAR(255),
  `duration` VARCHAR(255),
  `start_date` DATETIME,
  `end_date` DATETIME,
  `type` ENUM('THEATRE','DANCE','PERFORMANCE_ART','MUSIC'),
  `create_time` DATETIME NOT NULL,
  `update_time` DATETIME,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_by` VARCHAR(45),
  `is_deleted` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;