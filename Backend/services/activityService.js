const pool = require('../config/db');

exports.logActivity = async (userId, actionType, entityType, entityId, description) => {
    try {
        await pool.query(
            `INSERT INTO activity_logs (user_id, action_type, entity_type, entity_id, description)
             VALUES ($1, $2, $3, $4, $5)`,
            [userId, actionType, entityType, entityId, description]
        );
    } catch (error) {
        console.error("Error logging activity:", error);
    }
};

exports.getUserTimeline = async (userId) => {
    try {
        const result = await pool.query(
            `SELECT id, action_type, entity_type, description, created_at 
             FROM activity_logs 
             WHERE user_id = $1 
             ORDER BY created_at DESC`,
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching timeline:", error);
        throw error;
    }
};
