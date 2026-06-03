import pool from "../db.js";

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const result = await pool.query(
      "INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING id,username",
      [username, email, password],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating User Please Try Again.", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching User Please Try Again.", error);
    throw error;
  }
};

export const getAllUsers = async (
  limit: number,
  offset: number,
  role?: string,
) => {
  try {
    let query = "SELECT * FROM users WHERE deleted_at IS NULL";

    const values: (number | string)[] = [];

    if (role) {
      values.push(role);
      query += `AND role = $${values.length}`;
    }

    query += " ORDER BY created_at DESC";

    values.push(limit);
    query += `LIMIT $${values.length} `;

    values.push(offset);
    query += `OFFSET $${values.length}`;

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Users Please Try Again.", error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching User Please Try Again.", error);
    throw error;
  }
};

export const harddeleteUser = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Deleting User Please Try Again.", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  password: string,
  email: string,
) => {
  try {
    const result = await pool.query(
      "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING id,email",
      [email, password, id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating User Please Try Again.", error);
    throw error;
  }
};

export const updatePassword = async (id: number, password: string) => {
  try {
    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING id,email",
      [password, id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Password Please Try Again.", error);
    throw error;
  }
};

export const checkUserExist = async (email: string) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching User Please Try Again.", error);
    throw error;
  }
};

export const checkExistingPassword = async (id: number) => {
  try {
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [id],
    );
    return result.rows[0].password;
  } catch (error) {
    console.log("Error Fetching Password Please Try Again.", error);
    throw error;
  }
};

export const softDeleteUser = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING id",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Soft Deleting User Please Try Again.", error);
    throw error;
  }
};

export const restoreUser = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE users SET deleted_at = NULL WHERE id = $1 RETURNING id,username",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Restoring User Please Try Again.", error);
    throw error;
  }
};
