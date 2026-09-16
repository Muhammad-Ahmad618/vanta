import pool from "@/db.js";

export const getAllNotifications = async (user_id: Number) => {
  try {
    const result = await pool.query(
      `
     SELECT 
     n.id,
     n.type,
     n.message,
     n.read_at,
     n.created_at,
     t.title AS task_title
     FROM notifications n
     LEFT JOIN tasks t ON t.task_id = n.task_id
     WHERE n.user_id = $1
     ORDER BY n.created_At DESC
     LIMIT 20
    `,
      [user_id],
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const getUnreadCount = async (user_id: Number) => {
  try {
    const result = await pool.query(
      `
        SELECT COUNT(*) AS unread_count
        FROM notifications
        WHERE user_id = $1 AND read_at IS NULL
        `,
      [user_id],
    );
    return result.rows[0].unread_count;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};

export const updateNotificationRead = async (
  notification_id: Number,
  user_id: Number,
) => {
  try {
    const result = await pool.query(
      `
            UPDATE notifications
            SET read_at = NOW()
            WHERE notification_id = $1 AND user_id = $2
            RETURNING 1
            `,
      [notification_id, user_id],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error marking notification read:", error);
    throw error;
  }
};

export const updateAllNotificationsRead = async (user_id: Number) => {
  try {
    const result = await pool.query(
      `
            UPDATE notifications
            SET read_at = NOW()
            WHERE user_id = $1 AND read_at IS NULL
            RETURNING *;
            `,
      [user_id],
    );
    return result.rows;
  } catch (error) {
    console.error("Error marking all notifications read:", error);
    throw error;
  }
};
