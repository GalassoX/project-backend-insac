const { sign, decode } = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../data/constants');
const { errors } = require('../data/response_codes');

function generateToken(id) {
    const token = sign({ ID: id }, SECRET_TOKEN, { algorithm: 'HS256' });
    return token;
}

function getUserByToken(token) {
    const result = decode(token, SECRET_TOKEN, { algorithms: ['HS256'] });
    return result;
}

function hasToken(req, res, next) {
    req.headers.authorization
        ? next()
        : res.status(401).json({ error: errors.UNAUTHORIZED });
}

module.exports = { generateToken, getUserByToken, hasToken };