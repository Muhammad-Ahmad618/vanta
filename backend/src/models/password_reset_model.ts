import pool from "../db.js";

export const insertToken = async (
  userId: number,
  token: string,
  expiresAt: Date,
) => {
  try {
    const result = await pool.query(
      `INSERT INTO password_reset_token(user_id, token, expires_at) 
       VALUES($1, $2, $3) 
       ON CONFLICT(user_id) 
       DO UPDATE SET token = $2, expires_at = $3 
       RETURNING *`,
      [userId, token, expiresAt],
    );

    return result.rows[0];
  } catch (error) {
    console.log("Error inserting token Please Try Again.", error);
    throw error;
  }
};

export const getTokenInfo = async (token: string) => {
  try {
    const result = await pool.query(
      `SELECT user_id, expires_at FROM password_reset_token WHERE token = $1`,
      [token],
    );

    return result.rows[0];
  } catch (error) {
    console.log("Error while fetching Details", error);
    throw error;
  }
};

export const deleteToken = async (token: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM password_reset_token WHERE token = $1`,
      [token],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error while Deleting", error);
    throw error;
  }
};
