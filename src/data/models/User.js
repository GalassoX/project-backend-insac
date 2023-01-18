const { DataTypes } = require("sequelize");
const { db } = require("../../utils/database");

const UserModel = db.define('User', {
    documento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    primer_nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    segundo_nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    primer_apellido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    segundo_apellido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    celular: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    correo: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'usuarios'
});

module.exports = UserModel;