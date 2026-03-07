const pool = require('../config/db');

const createAccount= async(userId, bankName, balance, accountType) =>{
    const result = await pool.query(`INSERT INTO accounts (user_id, bank_name, balance, account_type) 
        VALUES($1, $2, $3, $4) 
        RETURNING *`, 
        [userId, bankName, balance, accountType])
    return result.rows[0];
}

const getAccounts = async(userId)=>{
    const result = await pool.query(`SELECT * FROM accounts 
        WHERE user_id=$1
        ORDER BY created_at DESC`,[userId])

    return result.rows
}

const updateAccountBalance = async(accountId, newBalance, userId)=>{
    const result = await pool.query(
        `UPDATE accounts
        SET balance=$1, updated_at = CURRENT_TIMESTAMP
        WHERE id=$2 AND user_id=$3
        RETURNING *
        `, [newBalance, accountId, userId])
        if(result.rows.length === 0){
            throw new Error("Account not found or it belongs to antoher user")
        }
        return result.rows[0]
}


module.exports = {
    createAccount,
    getAccounts,
    updateAccountBalance
}