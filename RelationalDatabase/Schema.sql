-- Creating the main database with name "NamedZeus"
CREATE DATABASE namedzeus;

-- Creating the default user named "admin"
CREATE USER admin WITH LOGIN PASSWORD 'admin';

-- Granting all privileges to our user
GRANT ALL PRIVILEGES ON DATABASE namedzeus TO admin;

-- Conecting into database "Namedzeus" with user "admin"
\c namedzeus admin;
