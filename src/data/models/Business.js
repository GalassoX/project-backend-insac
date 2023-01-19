const { DataTypes } = require("sequelize");
const { db } = require("../../utils/database");
const UserModel = require("./user");

const BusinessModel = db.define('Business', {
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    direccion: {
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
    },
    propietario: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'ID'
        },
        allowNull: false
    }
}, {
    tableName: 'negocios'
});

module.exports = BusinessModel;