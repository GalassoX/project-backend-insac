const { Router } = require("express");
const { createBusiness, deleteBusiness } = require("../controllers/business.controller");
const { hasToken } = require("../utils/jwt");

const router = Router();

router.get('/');

router.post('/', hasToken, createBusiness);
router.delete('/:id', hasToken, deleteBusiness);

module.exports = router;