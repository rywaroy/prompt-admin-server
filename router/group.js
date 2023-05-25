const express = require('express');
const { createGroup, updateGroup, deleteGroup, getGroup } = require('../controller/group');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/group', auth(), createGroup);
router.put('/group/:id', auth(), updateGroup);
router.delete('/group/:id', auth(), deleteGroup);
router.get('/group', getGroup);

module.exports = router;
