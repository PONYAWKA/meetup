export const getMeetup = (field: string) => `
SELECT *
FROM meetup
WHERE ($1 = '' OR theme LIKE $1)
AND ($2 = '' OR place LIKE $2)
AND ($3 = '' OR id = $3::integer)
ORDER BY ${field}
OFFSET $4
LIMIT $5;`;
