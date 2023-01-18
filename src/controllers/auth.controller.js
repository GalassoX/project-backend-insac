const { Op } = require('sequelize');
const UserModel = require('../data/models/user');
const { errors } = require('../data/response_codes');
const { generateToken } = require('../utils/jwt');

async function createUser(req, res) {
    const { document, name, phone, email } = req.body;

    const errs = [];
    if (!document || isNaN(document)) {
        errs.push(errors.INVALID_DOCUMENT);
    }
    if (!phone || isNaN(phone)) {
        errs.push(errors.INVALID_PHONE);
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
        errs.push(errors.INVALID_EMAIL);
    }

    if (name) {
        if (!name.firstname) {
            errs.push(errors.INVALID_FIRSTNAME);
        }
        if (!name.lastname) {
            errs.push(errors.INVALID_LASTNAME);
        }
        if (!name.secondlastname) {
            errs.push(errors.INVALID_SECONDLASTNAME);
        }
    } else {
        errs.push(errors.INVALID_NAME);
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
            res.status(400).json({ error: [errors.DOCUMENT_EXISTS] });
            return;
        } else if (exist.correo == email) {
            res.status(400).json({ error: [errors.EMAIL_EXISTS] });
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

module.exports = { createUser };