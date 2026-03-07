const pool = require('../config/db')

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]
};

const CreateUser = async (name, email, password) => {
    const result = await pool.query('INSERT INTO users (name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email', [name, email, password]);
    return result.rows[0]
}

module.exports = {
    findUserByEmail,
    CreateUser
}
