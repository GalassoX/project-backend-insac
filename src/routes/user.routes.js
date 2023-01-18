const { Router } = require('express');
const { hasToken } = require('../utils/jwt');
const auth = require('./auth.routes');

const router = Router();

router.get('/', hasToken, (req, res, next) => {
});

router.use('/auth', auth);

module.exports = router;