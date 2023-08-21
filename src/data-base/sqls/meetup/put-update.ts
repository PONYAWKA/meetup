export const updateMeetupSQL = `
UPDATE meetup
SET
    theme = COALESCE($1, theme),
    description = COALESCE($2, description),
    tags = COALESCE($3, tags),
    time = COALESCE($4, time),
    place = COALESCE($5, place)
WHERE id = $6
RETURNING *;
`;
