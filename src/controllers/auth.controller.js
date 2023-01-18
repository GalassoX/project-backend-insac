const { Op } = require('sequelize');
const UserModel = require('../data/models/user');
const codes = require('../data/response_codes');
const { isValidEmail, isValidNumber } = require('../utils/checkers');
const { generateToken } = require('../utils/jwt');

async function createUser(req, res) {
    const { document, name, phone, email } = req.body;

    const errs = [];
    if (!document || isNaN(document)) {
        errs.push(codes.INVALID_DOCUMENT);
    }
    if (!phone || isNaN(phone)) {
        errs.push(codes.INVALID_PHONE);
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
        errs.push(codes.INVALID_EMAIL);
    }

    if (name) {
        if (!name.firstname) {
            errs.push(codes.INVALID_FIRSTNAME);
        }
        if (!name.lastname) {
            errs.push(codes.INVALID_LASTNAME);
        }
        if (!name.secondlastname) {
            errs.push(codes.INVALID_SECONDLASTNAME);
        }
    } else {
        errs.push(codes.INVALID_NAME);
    }

    if (errs.length > 0) {
        res.status(400).json({ error: errs });
        return;
    }

    const exist = await UserModel.findOne({
        where: {
            [Op.and]: [
                { correo: email },
                { documento: document }
            ]
        }
    });

    if (exist) {
        if (exist.documento == document) {
            res.status(400).json({ error: [codes.DOCUMENT_EXISTS] });
            return;
        } else if (exist.correo == email) {
            res.status(400).json({ error: [codes.EMAIL_EXISTS] });
        }
    }

    const user = await UserModel.create({
        documento: document,
        primer_nombre: name.firstname,
        segundo_nombre: name.secondname || '',
        primer_apellido: name.lastname,
        segundo_apellido: name.secondlastname,
        celular: phone,
        correo: email
    });

    const token = generateToken(user.id);

    res.status(201).json({ token });
}

async function loginUser(req, res) {
    const { email, document } = req.body;

    const errs = [];
    if (!isValidEmail(email)) {
        errs.push(codes.INVALID_EMAIL);
    }

    if (!isValidNumber(document)) {
        errs.push(codes.INVALID_DOCUMENT);
    }

    if (errs.length > 0) {
        res.status(400).json({ errors: errs });
        return;
    }

    const user = await UserModel.findOne({
        where: {
            [Op.and]: [
                { correo: email },
                { documento: document }
            ]
        }
    });
    if (!user) {
        res.status(400).json({ error: codes.USER_NOT_EXISTS });
        return;
    }

    const token = generateToken(user.id);

    res.status(200).json({ ...codes.USER_LOGGED_SUCCESS, token });
}

module.exports = { createUser, loginUser };