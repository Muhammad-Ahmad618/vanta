import pool from "../db.js";

export const getMembersByWorkspaceId = async (workspaceId: number) => {
  try {
    const result = await pool.query(
      "SELECT users.name, users.email, workspace.name, workspace_member.joined_at, workspace_member.role FROM workspace_member INNER JOIN users ON workspace_member.user_id = users.id INNER JOIN workspace ON workspace_member.workspace_id = workspace.id WHERE workspace_id = $1",
      [workspaceId],
    );
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Workspace Members Please Try Again.", error);
    throw error;
  }
};

export const getAllMembers = async () => {
  try {
    const result = await pool.query(
      "SELECT users.name, users.email, workspace.name, workspace_member.joined_at, workspace_member.role FROM workspace_member INNER JOIN users ON workspace_member.user_id = users.id INNER JOIN workspace ON workspace_member.workspace_id = workspace.id",
    );
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Workspace Members Please Try Again.", error);
    throw error;
  }
};

export const getWorkspaceMemberById = async (id: number) => {
  try {
    const result = await pool.query(
      "SELECT users.name, users.email, workspace.name AS workspace_name, workspace_member.role, workspace_member.joined_at FROM workspace_member INNER JOIN users ON workspace_member.user_id = users.id INNER JOIN workspace ON workspace_member.workspace_id = workspace.id WHERE workspace_member.id = $1",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Workspace Member Please Try Again.", error);
    throw error;
  }
};

export const removeWorkspaceMember = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM workspace_member WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Removing Workspace Member Please Try Again.", error);
    throw error;
  }
};
