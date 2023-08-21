create TABLE person (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    role text[],
    password VARCHAR(255),
    refreshToken text
);
