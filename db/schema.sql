-- DROP DATABASE IF EXISTS nin_db;
-- CREATE DATABASE nin_db;
USE nin_db;

CREATE TABLE eventlocations (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
location VARCHAR(255) NOT NULL DEFAULT ("none"),
address VARCHAR(500) NOT NULL DEFAULT ("none"),
eventDescription VARCHAR(500) NOT NULL DEFAULT ("none"),
eventTime DATETIME (0),
latitude DECIMAL(8, 6) NOT NULL DEFAULT (0.00),
longitude DECIMAL(8, 6) NOT NULL DEFAULT (0.00),
createdAt TIMESTAMP NOT NULL DEFAULT ("CURRENT_TIMESTAMP()"),
updatedAt TIMESTAMP NOT NULL DEFAULT ("CURRENT_TIMESTAMP()")
);