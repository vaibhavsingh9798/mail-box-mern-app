const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {send,getInbox,updateMailRead,deleteMail} = require('../controllers/mailbox')
const router = express.Router();

router.post('/send',authMiddleware.authenticateUser,send)

router.get('/inbox',authMiddleware.authenticateUser,getInbox)

router.put('/:mailId/markAsRead',authMiddleware.authenticateUser,updateMailRead)

router.delete('/:mailId/deleteMail',authMiddleware.authenticateUser,deleteMail)

module.exports = router;