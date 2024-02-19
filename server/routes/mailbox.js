const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {send} = require('../controllers/mailbox')
const router = express.Router();

router.post('/send',authMiddleware.authenticateUser,send)


module.exports = router;