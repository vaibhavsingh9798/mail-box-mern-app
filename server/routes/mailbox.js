const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {send,getInbox} = require('../controllers/mailbox')
const router = express.Router();

router.post('/send',authMiddleware.authenticateUser,send)

router.get('/inbox',authMiddleware.authenticateUser,getInbox)


module.exports = router;