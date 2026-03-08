const express = require('express');
const cors = require('cors');

const app = express()

const authRoutes = require('./auth/authRoutes')
const accountRoutes = require('./routes/accountRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const refundRoutes = require('./routes/refundRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
app.use(cors());
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/account',accountRoutes)
app.use('/expense',expenseRoutes)
app.use('/refund',refundRoutes)
app.use('/subscription',subscriptionRoutes)
app.use('/dashboard',dashboardRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})