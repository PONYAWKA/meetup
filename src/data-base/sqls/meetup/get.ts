export const getMeetup = (field: string) => `
SELECT *FROM meetup
WHERE ($1 = '' OR theme LIKE $1)
AND ($2 = '' OR place LIKE $2)
ORDER BY ${field}
OFFSET $3
LIMIT $4;`;
