const express = require('express');
const { createUser, login, getUserInfo } = require('../controller/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/user', auth(false), getUserInfo);

module.exports = router;
