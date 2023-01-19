const { sign, decode } = require('jsonwebtoken');
const { SECRET_TOKEN, HEADER_AUTH_KEY } = require('../data/constants');
const codes = require('../data/response_codes');

function generateToken(id) {
    const token = sign({ ID: id }, SECRET_TOKEN, { algorithm: 'HS256' });
    return token;
}

function getUserByToken(token) {
    const result = decode(token, SECRET_TOKEN, { algorithms: ['HS256'] });
    return result;
}

function hasToken(req, res, next) {
    req.headers[HEADER_AUTH_KEY]
        ? next()
        : res.status(401).json({ error: codes.UNAUTHORIZED });
}

module.exports = { generateToken, getUserByToken, hasToken };