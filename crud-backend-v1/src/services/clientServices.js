import { query } from "../db.js";

export const getClients = async () => {
  const { rows } = await query("SELECT * FROM client_db");
  return rows;
};

export const createClient = async (clientData) => {
  const { name, email, job, rate, isActive } = clientData;

  const queryStr = `
  INSERT INTO client_db (name, email, job, rate, isactive)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  const { rows } = await query(queryStr, [name, email, job, rate, isActive]);
  return rows[0];
};

export const updateClient = async (clientData, clientId) => {
  const { name, email, job, rate, isActive } = clientData;

  const queryStr = `
    UPDATE client_db SET name = $1, email = $2, job = $3, rate = $4, isactive = $5
    WHERE id = $6 RETURNING *`;

  const { rows } = await query(queryStr, [
    name,
    email,
    job,
    rate,
    isActive,
    clientId,
  ]);
  return rows;
};

export const deleteClient = async (clientId) => {
  const queryStr = `
    Delete From client_db
    WHERE id = $1
    RETURNING *;
    `;
  const { rows } = await query(queryStr, [clientId]);
  return !!rows;
};

export const getSearchClient = async (q) => {
  const queryStr = `
    SELECT
        *
    FROM
        client_db
    WHERE
        name ILIKE $1 or email ILIKE $1 or job ILIKE $1
        ;
    `;

  const { rows } = await query(queryStr, [`%${q}%`]);
  console.log(rows);
  return rows;
};
