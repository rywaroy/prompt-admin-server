const express = require('express');
const { createGroup, updateGroup, deleteGroup, getGroup } = require('../controller/group');

const router = express.Router();

router.post('/group', createGroup);
router.put('/group/:id', updateGroup);
router.delete('/group/:id', deleteGroup);
router.get('/group', getGroup);

module.exports = router;
