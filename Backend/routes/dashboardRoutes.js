const express = require('express');
const { dashboardSummary } = require('../controllers/dashboardController')
const router = express.Router();
const {authenticate} = require('../Middleware/RouteAccess')

router.get('/summary', authenticate, dashboardSummary)

module.exports = router;