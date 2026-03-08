const express = require('express')
const router = express.Router()
const {authenticate} = require('../Middleware/RouteAccess')
const {addRefund, refundsList, refundReceived, refundDelete} = require('../controllers/refundController')

router.post('/create-refund', authenticate, addRefund)
router.get('/refunds', authenticate, refundsList)
router.patch('/refund-received/:id', authenticate, refundReceived)
router.delete('/refund-delete/:id', authenticate, refundDelete)

module.exports = router;