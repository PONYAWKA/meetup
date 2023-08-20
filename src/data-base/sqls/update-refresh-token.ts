export const updateRefreshToken = `
UPDATE person
SET refreshtoken = $1
WHERE name = $2
RETURNING *;
`;
