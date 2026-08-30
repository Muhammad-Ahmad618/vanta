import pool from "@/db.js";

export const getDashboardStats = async (userId: number) => {
  try {
    const result = await pool.query(
      `
   SELECT 
   COUNT (*) AS total,
   COUNT (*) FILTER (WHERE status = 'completed') AS completed,
   COUNT (*) FILTER (WHERE status = 'in_progress') AS inprogress,
   COUNT (*) FILTER (WHERE status = 'pending') AS pending,
   COUNT (*) FILTER (WHERE due_date < NOW() AND status != 'completed') AS overdue
   FROM tasks
   WHERE (user_id = $1 OR assigned_to = $1) AND deleted_at IS NULL
  `,
      [userId],
    );
    return result.rows[0];
  } catch (error) {
    console.log("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const getDashboardTrends = async (userId: Number, mode: string) => {
  try {
    const isMonthly = mode === "monthly";

    let result = await pool.query(
      `
      SELECT
      ${
        isMonthly
          ? `
      TO_CHAR(created_at, 'Mon YYYY') AS period`
          : `Week ' || CEIL(EXTRACT(DOY FROM created_at)/ 7.0):: INT AS period`
      },
      
      COUNT (*) FILTER (WHERE status = 'completed') AS completed,
      COUNT (*) FILTER (WHERE status = 'in_progress') AS in_progress,
      COUNT (*) FILTER (WHERE due_date <= NOW() AND status != 'complete') AS overdue
      FROM tasks
      WHERE (user_id = $1 OR assigned_to = $1) 
      AND deleted_at IS NULL
      AND created_at >= NOW() - ${isMonthly ? "INTERVAL '6 MONTH'" : "INTERVAL '6 WEEKS'"}
      GROUP BY periods 
      ORDER BY MIN(created_at)
    `,
      [userId],
    );

    return result.rows;
  } catch (error) {
    console.log("Error fetching dashboard trends:", error);
    throw error;
  }
};
