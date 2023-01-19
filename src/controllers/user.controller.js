const { HEADER_AUTH_KEY } = require("../data/constants");
const BusinessModel = require("../data/models/Business");
const UserModel = require("../data/models/user");
const codes = require("../data/response_codes");
const { parseBusiness } = require("../utils/business");
const { getUserByToken } = require("../utils/jwt");

async function getUser(req, res) {
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

    const userBusiness = await BusinessModel.findAll({
        where: {
            propietario: user.id
        }
    });

    res.status(200).json({
        response: codes.USER_FOUND,
        user: {
            ...user.dataValues,
            business: parseBusiness(userBusiness)
        }
    });
}

module.exports = { getUser };