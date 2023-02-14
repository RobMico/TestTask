require('dotenv').config({ path: '.' + process.env.NODE_ENV + '.env' });
const sequelize = require('./db');

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();
};

start();