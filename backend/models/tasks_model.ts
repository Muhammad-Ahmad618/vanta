import pool from "../db";

export const getAllTasks = async (limit: number, offset: number) => {
  try {
    const result = await pool.query(
      "SELECT task_id,title,description,status,tasks.created_at,users.name FROM tasks INNER JOIN users ON tasks.user_id = users.id ORDER BY tasks.task_id DESC LIMIT $1 OFFSET $2",
      [limit, offset],
    );
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Tasks Please Try Again.", error);
    throw error;
  }
};

export const getTaskById = async (id: number) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Task Please Try Again.", error);
    throw error;
  }
};

export const createTask = async (title: string, description: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO tasks(title,description) VALUES ($1,$2) RETURNING*",
      [title, description],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating Task Please Try Again.", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  title: string,
  description: string,
) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING*",
      [title, description, id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Task Please Try Again.", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Deleting Task Please Try Again.", error);
    throw error;
  }
};

export const changeTaskStatus = async (id: number, status: string) => {
  try {
    const result = await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING*",
      [status, id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Changing Task Status Please Try Again.", error);
    throw error;
  }
};
