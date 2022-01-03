DROP DATABASE IF EXISTS mixer_db;
CREATE DATABASE mixer_db;
\c mixer_db;

CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    img VARCHAR(100) NOT NULL,
    ingredients VARCHAR(100) NOT NULL,
    measurments VARCHAR(100) NOT NULL,
    instructions TEXT NOT NULL,
    likes INT DEFAULT(0)
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL,
    img_sm VARCHAR(100) NOT NULL,
    img_md VARCHAR(100) NOT NULL,
    img_lg VARCHAR(100) NOT NULL,
    likes INT DEFAULT(0)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE fav_cocktails (
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    cocktail_id INT NOT NULL REFERENCES cocktails ON DELETE CASCADE
);

CREATE TABLE fav_ingredients (
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    ingredient_id INT NOT NULL REFERENCES ingredients ON DELETE CASCADE
);