CREATE DATABASE IF NOT EXISTS `beamitfast` DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
USE beamitfast;

CREATE TABLE IF NOT EXISTS `Users` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(40) NOT NULL,
  -- max length a email address can have
  `Email` varchar(255) NOT NULL,
  -- SHA1 encryption produces a fixed-length 40 chars result
  `Password` char(40) NOT NULL,
  -- 35 is suggested by standard but no harm having more
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `City` varchar(35) NOT NULL,
  `MobilePhone` varchar(30) NOT NULL,
  `PickupLoc` varchar(255),
  `Vehicle` varchar(255),
  `TimeCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Details for each user';

CREATE TABLE IF NOT EXISTS `RunRequests` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `SenderId` bigint unsigned NOT NULL,
  `ReceiverId` bigint unsigned NOT NULL,
  `PickupLoc` varchar(255) NOT NULL,
  `DropOffLoc` varchar(255) NOT NULL,
  `ProposedPrice` int unsigned NOT NULL,
  `TimeLimit` int unsigned NOT NULL,
  `PackageWeight` int unsigned NOT NULL,
  `PackageD1` int unsigned NOT NULL,
  `PackageD2` int unsigned NOT NULL,
  `PackageD3` int unsigned NOT NULL,
  -- undecided if it should be nullable
  `PackageDesc` text,
  `RequestExpireOn` datetime NOT NULL,
  `TimeCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Details for each run request';

CREATE TABLE IF NOT EXISTS `RunTrans` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `SenderId` bigint unsigned NOT NULL,
  `ReceiverId` bigint unsigned NOT NULL,
  `RunnerId` bigint unsigned NOT NULL,
  `PickupLoc` varchar(255) NOT NULL,
  `DropOffLoc` varchar(255) NOT NULL,
  `PickupTime` datetime NOT NULL,
  `DropOffTime` datetime NOT NULL,
  `ProposedPrice` int unsigned NOT NULL,
  `ActualPrice` int unsigned NOT NULL,
  `TimeLimit` int unsigned NOT NULL,
  `PackageWeight` int unsigned NOT NULL,
  `PackageD1` int unsigned NOT NULL,
  `PackageD2` int unsigned NOT NULL,
  `PackageD3` int unsigned NOT NULL,
  `TimeCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='History for each run';