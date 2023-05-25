const express = require('express');
const { createPrompt, updatePrompt, deletePrompt, getPrompt, getPromptById } = require('../controller/prompt');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/prompt', auth(), createPrompt);
router.put('/prompt/:id', auth(), updatePrompt);
router.delete('/prompt/:id', auth(), deletePrompt);
router.get('/prompt', getPrompt);
router.get('/prompt/:id', getPromptById);

module.exports = router;
