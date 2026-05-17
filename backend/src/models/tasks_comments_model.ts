import pool from "../db.js";

export const getAllTaskComments = async (task_id: number) => {
  try {
    const result = await pool.query(
      "SELECT task_comments.content, task_comments.created_at, users.name FROM task_comments INNER JOIN users ON users.id = task_comments.user_id WHERE task_comments.task_id = $1 ORDER BY task_comments.id DESC",
      [task_id],
    );
    return result.rows;
  } catch (error) {
    console.log("Error Fetching Task Comments Please Try Again.", error);
    throw error;
  }
};

export const createTaskComment = async (
  task_id: number,
  user_id: number,
  content: string,
) => {
  try {
    const result = await pool.query(
      "INSERT INTO task_comments(task_id, user_id, content) VALUES ($1, $2, $3) RETURNING*",
      [task_id, user_id, content],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating Task Comment Please Try Again.", error);
    throw error;
  }
};

export const updateTaskComment = async (id: number, content: string) => {
  try {
    const result = await pool.query(
      "UPDATE task_comments SET content = $1 WHERE id = $2 RETURNING*",
      [content, id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Task Comment Please Try Again.", error);
    throw error;
  }
};

export const deleteTaskComment = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM task_comments WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Deleting Task Comment Please Try Again.", error);
    throw error;
  }
};
