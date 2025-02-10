const pool = require("../db");

async function findContactsByEmailOrPhone(email, phoneNumber) {
  const result = await pool.query(
    `SELECT * FROM Contact WHERE email = $1 OR phoneNumber = $2`,
    [email, phoneNumber]
  );
  return result.rows;
}

async function createPrimaryContact(email, phoneNumber) {
  const result = await pool.query(
    `INSERT INTO Contact (email, phoneNumber, linkPrecedence) VALUES ($1, $2, 'primary') RETURNING *`,
    [email, phoneNumber]
  );
  return result.rows[0];
}

async function createSecondaryContact(email, phoneNumber, linkedId) {
  const result = await pool.query(
    `INSERT INTO Contact (email, phoneNumber, linkedId, linkPrecedence) VALUES ($1, $2, $3, 'secondary') RETURNING *`,
    [email, phoneNumber, linkedId]
  );
  return result.rows[0];
}

module.exports = { findContactsByEmailOrPhone, createPrimaryContact, createSecondaryContact };
