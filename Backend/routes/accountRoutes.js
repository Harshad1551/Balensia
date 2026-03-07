const express = require('express')
const router = express.Router()
const {createAccount , getAccounts, updateAccountBalance} = require('../controllers/accountController')
const {authenticate} = require('../Middleware/RouteAccess')

router.post('/create-account', authenticate, createAccount)
router.get('/getAccounts', authenticate, getAccounts)
router.patch('/update-account/:id', authenticate, updateAccountBalance)

module.exports = router;