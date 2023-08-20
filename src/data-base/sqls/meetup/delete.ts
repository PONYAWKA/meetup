export const deleteMeetupSQL = `
DELETE FROM meetup
WHERE id = $1
`;
