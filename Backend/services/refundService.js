const pool = require('../config/db');

exports.createRefund = async(userId, person, amount, note)=>{
    const result = await pool.query(`
        INSERT INTO refunds (user_id, person, amount, note)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `, [userId, person, amount, note])
    
    return result.rows[0]
}

exports.getRefunds = async(userId)=>{
    const result = await pool.query(`
        SELECT * FROM refunds
        WHERE user_id=$1`, [userId]
    )

    return result.rows
}

exports.markRefundReceived = async(refundId, userId)=>{
    const result = await pool.query(`
        UPDATE refunds
        SET status = 'received', updated_at = CURRENT_TIMESTAMP
        WHERE id= $1 AND user_id= $2
        RETURNING *`, [refundId, userId])

        if(result.rows.length === 0){
            return res.status(401).json({
                message:"Refund not found or unauthorized"
            })
        }
        return result.rows[0]
}

exports.deleteRefund = async(refundId, userId)=>{
    const result = await pool.query(`DELETE FROM refunds
        WHERE id=$1 AND user_id=$2
        RETURNING *`, [refundId, userId])

    if(result.rows.length === 0){
            return res.status(401).json({
                message:"Refund not found or unauthorized"
            })
        }
    return result.rows[0]
}