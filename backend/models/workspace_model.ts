import pool from "../db";

export const getAllWorkspace = async () => {
  try {
    const result = await pool.query("SELECT * FROM workspace ORDER BY id DESC");
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Workspace Please Try Again.", error);
    throw error;
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO workspace(name) VALUES ($1) RETURNING*",
      [name],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating Workspace Please Try Again.", error);
    throw error;
  }
};

export const updateWorkspace = async (id: number, name: string) => {
  try {
    const result = await pool.query(
      "UPDATE workspace SET name = $1 WHERE id = $2 RETURNING*",
      [name, id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Workspace Please Try Again.", error);
    throw error;
  }
};

export const deleteWorkspace = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM workspace WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Deleting Workspace Please Try Again.", error);
    throw error;
  }
};

export const getWorkspaceById = async (id: number) => {
  try {
    const result = await pool.query(
      "SELECT workspace.name, workspace.created_at, users.name FROM workspace INNER JOIN users ON workspace.owner_id = users.id WHERE workspace.id = $1",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Workspace Please Try Again.", error);
    throw error;
  }
};
