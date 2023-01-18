const { DataTypes } = require("sequelize");
const { db } = require("../../utils/database");

const BusinessModel = db.define('Business', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
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
    }
}, {
    tableName: 'negocios'
});

module.exports = BusinessModel;