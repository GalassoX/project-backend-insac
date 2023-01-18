const { Router } = require('express');
const { createUser } = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', createUser);

module.exports = router;