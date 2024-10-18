CREATE TABLE IF NOT EXISTS `venue_show` (
  `id` VARCHAR(45) NOT NULL,
  `show_id` VARCHAR(45) NOT NULL,
  `venue_id` VARCHAR(45) NOT NULL,
  `type` VARCHAR(255),
  `date` DATETIME NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME,
  `active` BOOLEAN,
  `create_time` DATETIME NOT NULL,
  `update_time` DATETIME,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_by` VARCHAR(45),
  `is_deleted` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;