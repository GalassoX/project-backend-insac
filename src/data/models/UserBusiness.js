const { DataTypes } = require("sequelize");
const { db } = require("../../utils/database");
const BusinessModel = require("./Business");
const UserModel = require("./user");

const UserBusinessModel = db.define('UserBusiness', {
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'ID'
        },
        allowNull: false,
    },
    id_negocio: {
        type: DataTypes.INTEGER,
        references: {
            model: BusinessModel,
            key: 'ID'
        },
        allowNull: false
    }
}, {
    tableName: 'usuarios_negocios'
});

module.exports = UserBusinessModel;