const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/auth_controllers');
const { authenticate } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);

module.exports = router;