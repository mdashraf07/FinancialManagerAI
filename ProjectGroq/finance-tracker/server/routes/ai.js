const express = require('express');
const router = express.Router();
const { getInsights, chat } = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.get('/insights', auth, getInsights);
router.post('/chat', auth, chat);

module.exports = router;
