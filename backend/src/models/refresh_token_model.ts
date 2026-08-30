import pool from "@/db.js";

export const saveRefreshToken = async (userId: number, token: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO refresh_tokens(user_id,token) VALUES($1,$2)",
      [userId, token],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Saving Refresh Token", error);
    throw error;
  }
};

export const deleteRefreshToken = async (userId: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM refresh_token WHERE user_id = $1",
      [userId],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Deleting Refresh Token", error);
    throw error;
  }
};

export const findRefreshToken = async (token: string) => {
  try {
    const result = await pool.query(
      "SELECT * FROM refresh_token WHERE token = $1",
      [token],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Finding Refresh Token", error);
    throw error;
  }
};
