import pool from "../db.js";

export const getAllComments = async (task_id: number) => {
  try {
    const result = await pool.query(
      "SELECT task_comments.id AS comment_id , task_comments.content, task_comments.created_at, users.name FROM task_comments INNER JOIN users ON users.id = task_comments.user_id WHERE task_comments.task_id = $1 ORDER BY task_comments.id DESC",
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
      "WITH inserted_comment AS (INSERT INTO task_comments(task_id, user_id, content) VALUES ($1, $2, $3) RETURNING *) SELECT inserted_comment.id AS comment_id, inserted_comment.content, inserted_comment.created_at, users.name FROM inserted_comment JOIN users ON users.id = inserted_comment.user_id",
      [task_id, user_id, content],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating Task Comment Please Try Again.", error);
    throw error;
  }
};

export const updateTaskComment = async (id: number, user_id: number, content: string) => {
  try {
    const result = await pool.query(
      "WITH updated_comment AS (UPDATE task_comments SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING*) SELECT updated_comment.id AS comment_id, updated_comment.content, updated_comment.created_at, users.name FROM updated_comment JOIN users ON users.id = updated_comment.user_id",
      [content, id, user_id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Task Comment Please Try Again.", error);
    throw error;
  }
};

export const deleteTaskComment = async (id: number, user_id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM task_comments WHERE id = $1 AND user_id = $2 RETURNING*",
      [id, user_id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Deleting Task Comment Please Try Again.", error);
    throw error;
  }
};
