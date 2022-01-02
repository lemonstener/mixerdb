DROP DATABASE IF EXISTS mixer_db;
CREATE DATABASE mixer_db;
\c mixer_db;

CREATE TABLE cocktails (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    img VARCHAR(100) NOT NULL,
    ingredients VARCHAR(100) NOT NULL,
    measurments VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    likes INT DEFAULT(0)
);

CREATE TABLE ingredients (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,
    img_sm VARCHAR(100) NOT NULL,
    img_md VARCHAR(100) NOT NULL,
    img_lg VARCHAR(100) NOT NULL,
    likes INT DEFAULT(0)
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    fav_cocktails TEXT,
    fav_ingredients TEXT
);