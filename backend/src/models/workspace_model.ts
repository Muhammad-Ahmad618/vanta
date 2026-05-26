import pool from "../db.js";

export const getAllWorkspaces = async (limit: number, offset: number) => {
  try {
    const result = await pool.query(
      "SELECT workspace.id,workspace.name,workspace.created_at,users.username AS owner_name FROM workspace INNER JOIN users ON workspace.owner_id = users.id WHERE workspace.deleted_at IS NULL ORDER BY workspace.id DESC LIMIT $1 OFFSET $2",
      [limit, offset],
    );
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Workspace Please Try Again.", error);
    throw error;
  }
};

export const createWorkspace = async (
  name: string,
  description: string,
  owner_id: number,
) => {
  try {
    const result = await pool.query(
      "INSERT INTO workspace(name, description, owner_id) VALUES ($1,$2,$3) RETURNING*",
      [name, description, owner_id],
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
      "SELECT workspace.id, workspace.name AS workspace_name, workspace.owner_id, workspace.created_at, workspace.deleted_at, users.username AS owner_name FROM workspace INNER JOIN users ON workspace.owner_id = users.id WHERE workspace.id = $1",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Workspace Please Try Again.", error);
    throw error;
  }
};

export const softDeleteWorkspace = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE workspace SET deleted_at = NOW() WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Soft Deleting Workspace Please Try Again.", error);
    throw error;
  }
};

export const restoreWorkspace = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE workspace SET deleted_at = NULL WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Restoring Workspace Please Try Again.", error);
    throw error;
  }
};
