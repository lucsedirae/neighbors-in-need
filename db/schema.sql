DROP DATABASE IF EXISTS nin_db;
CREATE DATABASE nin_db;
USE nin_db;

CREATE TABLE event_locations (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
address VARCHAR(500) NOT NULL DEFAULT ("none"),
latitude FLOAT(6) NOT NULL DEFAULT (0.00),
longitude FLOAT(6) NOT NULL DEFAULT (0.00)
);

location
address
description
time_of_event
