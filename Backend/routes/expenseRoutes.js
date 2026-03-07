const express = require('express')
const router = express.Router()
const {create, get, update, Delete} = require('../controllers/expenseController')
const {authenticate} = require('../Middleware/RouteAccess')

router.post('/create-expense', authenticate, create)
router.get('/get-expenses', authenticate, get)
router.patch('/update-expense/:id', authenticate, update)
router.delete('/delete-expense/:id', authenticate, Delete)

module.exports = router