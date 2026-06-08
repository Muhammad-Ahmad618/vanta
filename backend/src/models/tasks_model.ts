import pool from "../db.js";

export const getAllTasks = async (
  limit: number,
  offset: number,
  status?: string,
) => {
  try {
    let query = `
      SELECT task_id,title,description,status,tasks.created_at,users.username AS name FROM tasks INNER JOIN users ON tasks.user_id = users.id WHERE tasks.deleted_at IS NULL AND ($1::TEXT IS NULL OR status = $1) ORDER BY tasks.task_id DESC LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [status ?? null, limit, offset]);
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Tasks Please Try Again.", error);
    throw error;
  }
};

export const getTaskById = async (id: number) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Task Please Try Again.", error);
    throw error;
  }
};

export const getTaskByUserId = async (
  user_id: number,
  limit: number,
  offset: number,
  status?: "pending" | "Inprogress" | "completed",
) => {
  try {
    let query = `
      SELECT * FROM tasks
      WHERE user_id = $1 AND deleted_at IS NULL
    `;

    const values: (number | string)[] = [user_id];

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    values.push(limit);
    query += ` ORDER BY task_id DESC LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Tasks Please Try Again.", error);
    throw error;
  }
};

export const getTaskByAssignedTo = async (
  assigned_to: number,
  limit: number,
  offset: number,
  status: "pending" | "Inprogress" | "completed" | null,
) => {
  try {
    const query = `
      SELECT * FROM tasks WHERE assigned_to = $1 AND deleted_at IS NULL AND ($2::TEXT IS NULL OR status = $2) ORDER BY task_id DESC LIMIT $3 OFFSET $4
    `;
    const result = await pool.query(query, [
      assigned_to,
      status ?? null,
      limit,
      offset,
    ]);
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Tasks Please Try Again.", error);
    throw error;
  }
};

export const createTask = async (
  title: string,
  description: string,
  priority: "low" | "medium" | "high",
  due_date: Date,
  user_id: number,
  workspace_id?: number,
  assigned_to?: number,
) => {
  try {
    const result = await pool.query(
      "INSERT INTO tasks(title,description,user_id,workspace_id,assigned_to,priority,due_date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING*",
      [
        title,
        description,
        user_id,
        workspace_id,
        assigned_to,
        priority,
        due_date,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating Task Please Try Again.", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  user_id: number,
  title: string,
  description: string,
  status: "pending" | "Inprogress" | "completed",
  priority: "low" | "medium" | "high",
  due_date: Date,
  assigned_to?: number,
) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, due_date = $5, assigned_to = $6 WHERE task_id = $7 AND user_id = $8 RETURNING*",
      [
        title,
        description,
        status,
        priority,
        due_date,
        assigned_to ?? null,
        id,
        user_id,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Task Please Try Again.", error);
    throw error;
  }
};

export const hardDeleteTask = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE task_id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Hard Deleting Task Please Try Again.", error);
    throw error;
  }
};

export const softDeleteTask = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET deleted_at = NOW() WHERE task_id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Soft Deleting Task Please Try Again.", error);
    throw error;
  }
};

export const restoreTask = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET deleted_at = NULL WHERE task_id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Restoring Task Please Try Again.", error);
    throw error;
  }
};

export const changeTaskStatus = async (
  id: number,
  user_id: number,
  status: "pending" | "Inprogress" | "completed",
) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET status = $1 WHERE task_id = $2 AND user_id = $3 RETURNING*",
      [status, id, user_id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Changing Task Status Please Try Again.", error);
    throw error;
  }
};

export const getDailyFocusTasks = async (user_id: number) => {
  try {
    const result = await pool.query(
      `SELECT task_id, title, description, priority, due_date, status
     FROM tasks 
     WHERE (user_id = $1 OR assigned_to = $1)
     AND deleted_at is NULL
     AND status IN ('pending', 'Inprogress')
     AND due_date <= CURRENT_DATE += INTERVAL '1 day'
     ORDER BY
     CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
     due_date ASC`,
      [user_id],
    );

    return result.rows;
  } catch (error) {
    console.log("Error Fetching Daily Focus Tasks Please Try Again.", error);
    throw error;
  }
};
