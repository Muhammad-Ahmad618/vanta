import pool from "../db.js";

export const getAllComments = async (task_id: number) => {
  try {
    const result = await pool.query(
      "SELECT task_comments.id AS comment_id , task_comments.content, task_comments.created_at, users.username AS name FROM task_comments INNER JOIN users ON users.id = task_comments.user_id WHERE task_comments.task_id = $1 AND task_comments.deleted_at IS NULL ORDER BY task_comments.id DESC",
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
      "WITH inserted_comment AS (INSERT INTO task_comments(task_id, user_id, content) VALUES ($1, $2, $3) RETURNING *) SELECT inserted_comment.id AS comment_id, inserted_comment.content, inserted_comment.created_at, users.username AS name FROM inserted_comment JOIN users ON users.id = inserted_comment.user_id",
      [task_id, user_id, content],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Creating Task Comment Please Try Again.", error);
    throw error;
  }
};

export const updateTaskComment = async (
  id: number,
  user_id: number,
  content: string,
) => {
  try {
    const result = await pool.query(
      "WITH updated_comment AS (UPDATE task_comments SET content = $1 WHERE id = $2 AND user_id = $3 RETURNING*) SELECT updated_comment.id AS comment_id, updated_comment.content, updated_comment.created_at, users.username AS name FROM updated_comment JOIN users ON users.id = updated_comment.user_id",
      [content, id, user_id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Updating Task Comment Please Try Again.", error);
    throw error;
  }
};

export const getCommentById = async (id: number) => {
  try {
    const result = await pool.query(
      "SELECT * FROM task_comments WHERE id = $1",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Fetching Task Comment Please Try Again.", error);
    throw error;
  }
};

export const hardDeleteTaskComment = async (id: number) => {
  try {
    const result = await pool.query(
      "DELETE FROM task_comments WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Hard Deleting Task Comment Please Try Again.", error);
    throw error;
  }
};

export const softDeleteTaskComment = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE task_comments SET deleted_at = NOW() WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Soft Deleting Task Comment Please Try Again.", error);
    throw error;
  }
};

export const restoreTaskComment = async (id: number) => {
  try {
    const result = await pool.query(
      "UPDATE task_comments SET deleted_at = NULL WHERE id = $1 RETURNING*",
      [id],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error Restoring Task Comment Please Try Again.", error);
    throw error;
  }
};
