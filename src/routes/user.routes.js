const { Router } = require('express');
const { getUser } = require('../controllers/user.controller');
const { HEADER_AUTH_KEY } = require('../data/constants');
const { hasToken, getUserByToken } = require('../utils/jwt');
const auth = require('./auth.routes');

const router = Router();

router.get('/', hasToken, getUser);

router.use('/auth', auth);

module.exports = router;