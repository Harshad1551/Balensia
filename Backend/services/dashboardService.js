const pool = require('../config/db')

    exports.getDashboardSummary = async(userId)=>{
        const result = await pool.query(`
            SELECT
            (SELECT COALESCE(SUM(balance),0) FROM accounts WHERE user_id=$1) AS bank_balance,
            (SELECT COALESCE(SUM(amount),0) FROM expenses WHERE user_id=$1) AS total_expenses,
            (SELECT COALESCE(SUM(amount),0) FROM refunds WHERE user_id=$1) AS pending_refunds,
            (SELECT COALESCE(SUM(total_amount),0) FROM subscriptions WHERE user_id=$1) AS subscription_cost
            `, [userId])

        const data = result.rows[0];

        const bankBalance= Number(data.bank_balance)
        const totalExpenses=Number(data.total_expenses)
        const pendingRefunds= Number(data.pending_refunds)
        const subscriptionCost= Number(data.subscription_cost)

         const realBalance = bankBalance - totalExpenses - subscriptionCost + pendingRefunds 
               
            
                return {
                    bankBalance,
                    totalExpenses,
                    pendingRefunds,
                    subscriptionCost,
                    realBalance
                }
    }