const pool = require('../config/db');

const createExpense = async(userId, expenseCategory, amount, note, date)=>{
    const result = await pool.query(`
       INSERT INTO expenses(user_id, category, amount, note, date)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *`,
    [userId, expenseCategory, amount, note, date])
    return result.rows[0]
}

const getExpenses = async(userId)=>{
    const result = await pool.query(`
        SELECT * FROM expenses WHERE user_id=$1
        ORDER BY date DESC`, [userId])

        return result.rows
  
 }

 const updateExpense = async(expenseId, expenseCategory, amount, note, date, userId)=>{
    const result = await pool.query(`
        UPDATE expenses
        SET
        category = COALESCE($1, category),
        amount = COALESCE($2, amount),
        note = COALESCE($3, note),
        date = COALESCE($4, date),
        updated_at = CURRENT_TIMESTAMP
        WHERE id=$5 AND user_id=$6
        RETURNING *`,
        [expenseCategory, amount, note, date, expenseId, userId])

        if(result.rows.length === 0){
            throw new Error("Expense not found or it belongs to another user")
        }
    return result.rows[0]
 }

 const deleteExpense = async(expenseId, userId)=>{
    const result = await pool.query(`
        DELETE FROM expenses
        WHERE id=$1 AND user_id=$2
        RETURNING *`,
        [expenseId, userId])

        if(result.rows.length === 0){
            throw new Error("Expense not found or it belongs to another user")
        }

    return result.rows[0]
 }


 module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
 }