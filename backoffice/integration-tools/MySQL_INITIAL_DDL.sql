DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL UNIQUE,
  `email` varchar(256) NOT NULL UNIQUE,
  `password` varchar(2048) NOT NULL,
  `isAdmin` boolean NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_username_password` (`username`, `password`),
  UNIQUE KEY `uc_email_password` (`email`, `password`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;


DROP TABLE IF EXISTS `posts`;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `description` varchar(2048) NOT NULL,
  `landingPage` varchar(256) NOT NULL,
  `buttonText` varchar(256) NOT NULL,
  `isVisible` boolean NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;