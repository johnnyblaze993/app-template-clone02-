CREATE TABLE IF NOT EXISTS digimon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    digimon_number INT NOT NULL
);

INSERT INTO digimon (name, type, digimon_number)
VALUES 
('Agumon', 'Reptile', 1),
('Gabumon', 'Animal', 2),
('Piyomon', 'Bird', 3);

CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    pokemon_number INT NOT NULL
);

INSERT INTO pokemon (name, type, pokemon_number)
VALUES 
('Bulbasaur', 'Grass/Poison', 1),
('Charmander', 'Fire', 4),
('Squirtle', 'Water', 7);