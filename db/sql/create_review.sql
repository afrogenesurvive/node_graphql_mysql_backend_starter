CREATE TABLE IF NOT EXISTS `review` (
  `id` VARCHAR(45) NOT NULL,
  `user_id` VARCHAR(45) NOT NULL,
  `show_id` VARCHAR(45) NOT NULL,
  `venue_id` VARCHAR(45),
  `event_id` VARCHAR(45),
  `type` ENUM('AUDIENCE','CRITIC'),
  `review` longtext NOT NULL,
  `create_time` DATETIME NOT NULL,
  `update_time` DATETIME,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_by` VARCHAR(45),
  `is_deleted` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;