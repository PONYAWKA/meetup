export const createMeetup = `
INSERT INTO meetup (theme, description, tags, time, place, person_name)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;`;
