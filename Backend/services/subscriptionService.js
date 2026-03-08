const pool = require('../config/db')

exports.createSubscription = async(userId, name, totalAmount, billingCycle, nextRenewal)=>{
    const result = await pool.query(`
        INSERT INTO subscriptions (user_id, name, total_amount, billing_cycle, next_renewal)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,[userId, name, totalAmount, billingCycle, nextRenewal])

        return result.rows[0]
}

exports.getSubscriptions = async(userId)=>{
    const result = await pool.query(`
        SELECT * FROM subscriptions
        WHERE user_id=$1
        ORDER BY created_at DESC`, [userId])

        return result.rows
}

exports.addMember = async(subscriptionId, memberName, shareAmount)=>{
    const result = await pool.query(`
        INSERT INTO subscription_members (subscription_id, member_name, share_amount)
        VALUES ($1, $2, $3)
        RETURNING *`, [subscriptionId, memberName, shareAmount])

    return result.rows[0]
}

exports.getMembers = async(subscriptionId)=>{
    const result = await pool.query(`
        SELECT * FROM subscription_members
        WHERE subscription_id=$1
        ORDER BY created_at DESC`, [subscriptionId])

        return result.rows
}

exports.updateMemberDetail = async(subscriptionId,memberId, memberName, shareAmount, paymentStatus)=>{
    const result = await pool.query(`
        UPDATE subscription_members
        SET
        member_name = COALESCE($1, member_name),
        share_amount = COALESCE($2, share_amount),
        payment_status = COALESCE($3, payment_status),
        updated_at = CURRENT_TIMESTAMP
        WHERE id =$4 AND subscription_id= $5
        RETURNING *`, [memberName, shareAmount, paymentStatus, memberId, subscriptionId])

        if(result.rows.length === 0){
            throw new Error("Member not found or it belongs to another subscription")
        }
        
    return result.rows[0];
}

exports.removeSubscription = async(subscriptionId, userId)=>{
    const result = await pool.query(`
        DELETE FROM subscriptions
        WHERE id = $1 AND user_id = $2
        RETURNING *`, [subscriptionId, userId])

        if(result.rows.length === 0){
            throw new Error("Subscription not found or it belongs to another user")
        }

        return result.rows[0]
}

exports.removeMemberSubscription = async(subscriptionId, memberId)=>{
    const result = await pool.query(`
        DELETE FROM subscription_members
        WHERE id = $1 AND subscription_id = $2
        RETURNING *`, [memberId, subscriptionId])

        if(result.rows.length === 0){
            throw new Error("Member not found or it belongs to another user")
        }

        return result.rows[0]
}

