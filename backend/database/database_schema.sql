  -- Erstelle die Datenbank, falls sie noch nicht existiert
  CREATE DATABASE IF NOT EXISTS AI_Voice_Assistant;

  -- Wechsel zur Datenbank
  USE AI_Voice_Assistant;

  -- Tabelle für Benutzer
  CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
  );