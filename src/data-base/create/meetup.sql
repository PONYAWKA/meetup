create TABLE meetup (
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255),
    description text,
    tags text[],
    time date,
    place text,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id)
);
