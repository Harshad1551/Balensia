const express = require('express')
const router = express.Router()

const { authenticate } = require('../Middleware/RouteAccess')

const {
  addSubscription,
  subscriptionList,
  createMember,
  memberList,
  updateMember,
  deleteSubscription,
  deleteMember
} = require('../controllers/subscriptionController')



router.post('/create', authenticate, addSubscription)

router.get('/', authenticate, subscriptionList)

router.delete('/:subscriptionId', authenticate, deleteSubscription)


router.post('/:subscriptionId/members', authenticate, createMember)

router.get('/:subscriptionId/members', authenticate, memberList)

router.patch('/:subscriptionId/members/:id', authenticate, updateMember)

router.delete('/:subscriptionId/members/:id', authenticate, deleteMember)

module.exports = router