create TABLE meetup (
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255),
    description text,
    tags text[],
    time date,
    place text,
    person_name text,
    FOREIGN KEY (person_name) REFERENCES person (name)
);
