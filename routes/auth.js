const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const auth = require('../middleware/auth');

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/me', auth.check ,authController.me)


module.exports = router;
