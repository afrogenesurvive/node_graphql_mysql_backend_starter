CREATE TABLE IF NOT EXISTS `tag` (
  `id` VARCHAR(45) NOT NULL,
  `entity_type` ENUM('USER','PRODUCTION_COMPANY','PRODUCTION_COMPANY_USER','VENUE','SHOW','EVENT','REVIEW','WATCHLIST') NOT NULL,
  `entity_id` VARCHAR(45) NOT NULL,
  `name` TEXT NOT NULL,
  `create_time` DATETIME NOT NULL,
  `update_time` DATETIME,
  `created_by` VARCHAR(45) NOT NULL,
  `updated_by` VARCHAR(45),
  `is_deleted` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;