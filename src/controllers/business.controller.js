const { Op } = require("sequelize");
const { HEADER_AUTH_KEY } = require("../data/constants");
const BusinessModel = require("../data/models/Business");
const UserModel = require("../data/models/user");
const UserBusinessModel = require("../data/models/UserBusiness");
const codes = require("../data/response_codes");
const { isValidEmail, isValidNumber } = require("../utils/checkers");
const { getUserByToken } = require("../utils/jwt");

async function getBusiness(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: codes.INVALID_ID });
        return;
    }

    const token = getUserByToken(req.headers[HEADER_AUTH_KEY]);

    const user = await UserModel.findOne({
        where: {
            id: token.ID
        }
    });

    if (!user) {
        res.status(401).json({ error: codes.INVALID_AUTH_TOKEN });
        return;
    }

    const business = await BusinessModel.findOne({ where: { id: id } });

    res.status(200).json(!business
        ? { response: codes.BUSINESS_NOT_FOUND }
        : { response: codes.BUSINESS_FOUND, business }
    );
}

async function createBusiness(req, res) {
    const { name, address, phone, email } = req.body;

    const token = getUserByToken(req.headers[HEADER_AUTH_KEY]);

    if (!token) {
        res.status(401).json({ error: codes.INVALID_AUTH_TOKEN });
        return;
    }

    const errors = [];
    if (!name) {
        errors.push(codes.INVALID_NAME);
    }
    if (!address) {
        errors.push(codes.INVALID_ADDRESS);
    }
    if (!isValidNumber(phone)) {
        errors.push(codes.INVALID_PHONE);
    }
    if (!isValidEmail(email)) {
        errors.push(codes.INVALID_EMAIL);
    }

    if (errors.length > 0) {
        res.status(400).json({ error: errors });
        return;
    }

    const user = await UserModel.findOne({
        where: {
            id: token.ID
        }
    });

    if (!user) {
        res.status(401).json({ error: codes.INVALID_AUTH_TOKEN });
        return;
    }

    const business = await BusinessModel.create({
        nombre: name,
        direccion: address,
        celular: phone,
        correo: email,
        propietario: user.id
    });
    await UserBusinessModel.create({ id_usuario: user.id, id_negocio: business.id });

    res.status(201).json({ response: codes.BUSINESS_CREATED, business: business });
}

async function deleteBusiness(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: codes.INVALID_ID });
        return;
    }

    const token = getUserByToken(req.headers[HEADER_AUTH_KEY]);

    const user = await UserModel.findOne({
        where: {
            id: token.ID
        }
    });

    if (!user) {
        res.status(401).json({ error: codes.INVALID_AUTH_TOKEN });
        return;
    }

    const exist = await UserBusinessModel.findOne({
        where: {
            [Op.and]: [{ id_usuario: user.id }, { id_negocio: id }]
        }
    });

    if (!exist) {
        res.status(400).json({ error: codes.INVALID_ID });
        return;
    }

    await UserBusinessModel.destroy({ where: { id: exist.id } });
    await BusinessModel.destroy({ where: { id: id } });

    res.status(200).json({ response: codes.BUSINESS_DELETED, message: 'Negocio eliminado correctamente.' });
}

module.exports = { getBusiness, createBusiness, deleteBusiness };