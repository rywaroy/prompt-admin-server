const express = require('express');
const { chat } = require('../controller/chat');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/chat', auth(false), chat);

module.exports = router;
