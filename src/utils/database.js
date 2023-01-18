const { Sequelize } = require('sequelize');

const db = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: '',
    database: 'insac_test'
});

async function connectDB() {
    try {
        db.authenticate();
        console.log('Connected to database');
    } catch (e) {
        console.error('Unable to connect to the database: ', e);
    }
}

async function closeDB() {
    await db.close();
}

module.exports = { db, connectDB, closeDB };