const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const auth = require('../middleware/auth');

router.post('/', auth.check, watchlistController.add)
router.delete('/:movie', auth.check, watchlistController.delete)
router.get('/', auth.check, watchlistController.list)

module.exports = router;
