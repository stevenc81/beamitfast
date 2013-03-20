CREATE DATABASE IF NOT EXISTS `beamitfast` DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
USE beamitfast;

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `UserId` varchar(20) NOT NULL,
  'email' varchar(30) NOT NULL,
  'password' CHAR(40) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserId` (`UserId`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Details for each user';

CREATE TABLE IF NOT EXISTS `pickup_req` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `UserId` varchar(20) NOT NULL,
  'email' varchar(30) NOT NULL,
  'password' CHAR(40) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserId` (`UserId`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Details for each user';