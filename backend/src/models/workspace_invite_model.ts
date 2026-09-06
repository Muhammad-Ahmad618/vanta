import pool from "@/db.js";
import crypto from "crypto";

export const generateInviteLink = async (
  workspace_id: Number,
  created_by: Number,
) => {
  try {
    await pool.query(
      `
            UPDATE workspace_invite
            SET is_active = false
            WHERE workspace_id = $1 and is_active = true;
            `,
      [workspace_id],
    );

    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const result = await pool.query(
      `
            INSERT INTO workspace_invite (
                workspace_id,
                token,
                expires_at,
                created_by
            )values($1,$2,$3,$4)
            RETURNING *
            `,
      [workspace_id, token, expires_at, created_by],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Generating Invite Link", error);
    throw error;
  }
};

export const getInviteByToken = async (token: string) => {
  try {
    const result = await pool.query(
      `
     SELECT 
     workspace_invite.*,
     workspace.name AS workspace_name,
     FROM workspace_invite
     LEFT JOIN workspace ON workspace.id = workspace_invite.workspace_id 
     WHERE workspace_invite.token = $1 
     AND workspace_invite.is_active = true
     AND workspace_invite.expires_at > NOW()
        `,
      [token],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Invite Token", error);
    throw error;
  }
};
