const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getStats
} = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.get('/stats', auth, getStats);
router.get('/', auth, getTransactions);
router.post('/', auth, addTransaction);
router.delete('/:id', auth, deleteTransaction);

module.exports = router;
