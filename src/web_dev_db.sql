CREATE DATABASE fuss_db;
USE fuss_db;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  credits INT DEFAULT 10
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  tags TEXT,
  price INT
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  skill_id INT,
  when_datetime DATETIME,
  note TEXT,
  price INT,
  status VARCHAR(20)
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tutor_id INT,
  rating INT,
  text TEXT,
  reviewer_name VARCHAR(100)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT,
  receiver_id INT,
  text TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
