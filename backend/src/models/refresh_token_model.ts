import pool from "@/db.js";

export const saveRefreshToken = async (userId: number, token: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO refresh_token(user_id,token) VALUES($1,$2)",
      [userId, token],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Saving Refresh Token", error);
    throw error;
  }
};
