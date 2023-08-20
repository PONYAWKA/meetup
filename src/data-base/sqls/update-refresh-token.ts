export const updateRefreshToken = `
UPDATE person
SET refreshtoken = $1
WHERE id = $2
RETURNING *;
`;
