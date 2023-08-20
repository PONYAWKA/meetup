export const createUserSQL = `INSERT INTO person (name,password,role) VALUES ($1,$2,$3) RETURNING *`;
