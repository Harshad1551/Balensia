const express = require('express');
const cors = require('cors');

const app = express()

const authRoutes = require('./auth/authRoutes')
const accountRoutes = require('./routes/accountRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
app.use(cors());
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/account',accountRoutes)
app.use('/expense',expenseRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})