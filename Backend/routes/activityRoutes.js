const express = require('express');
const router = express.Router();
const { getTimeline } = require('../controllers/activityController');
const { authenticate } = require('../Middleware/RouteAccess');

router.get('/timeline', authenticate, getTimeline);

module.exports = router;
