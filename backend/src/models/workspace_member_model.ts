import pool from "../db.js";

export const getMembersByWorkspaceId = async (workspaceId: number) => {
  try {
    const result = await pool.query(
      "SELECT users.name, users.email, workspace.name, workspace_member.joined_at, workspace_member.role FROM workspace_member INNER JOIN users ON workspace_member.user_id = users.id INNER JOIN workspace ON workspace_member.workspace_id = workspace.id WHERE workspace_member.workspace_id = $1",
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

export const removeWorkspaceMember = async (id: number, workspace_id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM workspace_member WHERE id = $1 AND workspace_id = $2 RETURNING*",
      [id, workspace_id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Removing Workspace Member Please Try Again.", error);
    throw error;
  }
};

export const insertWorkspaceMember = async (workspace_id: number, user_id: number, role: "member" | "owner") => {
  try {
    const result = await pool.query(
      "INSERT INTO workspace_member (workspace_id, user_id, role) VALUES ($1, $2, $3) RETURNING*",
      [workspace_id, user_id, role],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Adding Workspace Member Please Try Again.", error);
    throw error;
  }
}

export const getWorkspaceOwner = async (id: number) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workspace_member WHERE workspace_id = $1 AND role = 'owner'",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Finding Workspace Owner Please Try Again.", error);
    throw error;
  }
}

export const removeCurrentOwner = async (ownerId: number, workspaceId: number) => {
  try {
    const result = await pool.query(
      "UPDATE workspace_member SET role = 'member' WHERE user_id = $1 AND workspace_id = $2 RETURNING*",
      [ownerId, workspaceId],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Removing Workspace Owner Please Try Again.", error);
    throw error;
  }
}

export const makeNewOwner = async (newOwnerId: number, workspaceId: number) => {
  try {
    const result = await pool.query(
      "UPDATE workspace_member SET role = 'owner' WHERE user_id = $1 AND workspace_id = $2 RETURNING*",
      [newOwnerId, workspaceId],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Assigning New Owner Please Try Again.", error);
    throw error;
  }
}

export const removeWorkspaceMemberByUser = async (userId: number, workspaceId: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM workspace_member  WHERE user_id = $1 AND workspace_id = $2 RETURNING*",
      [userId, workspaceId],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error while leaving Workspace Please Try Again.", error);
    throw error;
  }
}

export const executeTransferOwnership = async (workspaceId: number, currentOwnerId: number, newOwnerId: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Demote the current owner to a member
    const removeOwnerResult = await client.query(
      "UPDATE workspace_member SET role = 'member' WHERE user_id = $1 AND workspace_id = $2 RETURNING*",
      [currentOwnerId, workspaceId],
    );
    const removeOwner = removeOwnerResult.rows[0];

    // 2. Promote the new owner to owner
    const addNewOwnerResult = await client.query(
      "UPDATE workspace_member SET role = 'owner' WHERE user_id = $1 AND workspace_id = $2 RETURNING*",
      [newOwnerId, workspaceId],
    );
    const addNewOwner = addNewOwnerResult.rows[0];

    // 3. Update the workspace owner_id reference
    const transferOwnerResult = await client.query(
      "UPDATE workspace SET owner_id = $1 WHERE id = $2 RETURNING*",
      [newOwnerId, workspaceId],
    );
    const transferowner = transferOwnerResult.rows[0];

    if (!removeOwner || !addNewOwner || !transferowner) {
      throw new Error("Ownership transfer failed: one or more records were not updated.");
    }

    await client.query("COMMIT");
    return { removeOwner, addNewOwner, transferowner };
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error during ownership transfer transaction:", error);
    throw error;
  } finally {
    client.release();
  }
};