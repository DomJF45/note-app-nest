CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    date_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    date_edited TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (firstname, lastname, email, password_hash)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$12$Wu4DbKBtY11BUEn1lLOosOZUf.GlLB.dz59fvUBCtfxTFMvHMSt5e');

INSERT INTO notes (userId, title, content)
VALUES (1, 'Meeting Notes', 'Discussion about upcoming project deadlines.');
