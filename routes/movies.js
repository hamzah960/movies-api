const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const auth = require('../middleware/auth');
const  admin = require('../middleware/admin');

router.post('/', [auth.check, admin.check], moviesController.create)
router.put('/:id', [auth.check, admin.check], moviesController.update)
router.delete('/:id', [auth.check, admin.check], moviesController.delete)

router.get('/', auth.check, moviesController.list)
router.get('/:id', auth.check, moviesController.find)

router.post('/:id/reviews', auth.check, moviesController.addReview)
router.get('/:id/reviews', moviesController.reviews)

module.exports = router;
