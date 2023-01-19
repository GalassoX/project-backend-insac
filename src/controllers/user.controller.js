const { HEADER_AUTH_KEY } = require("../data/constants");
const UserModel = require("../data/models/user");
const UserBusinessModel = require("../data/models/UserBusiness");
const codes = require("../data/response_codes");
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

    const userBusiness = await UserBusinessModel.findAll({
        where: {
            id_usuario: user.id
        }
    });

    res.status(200).json(userBusiness);
}

module.exports = { getUser };