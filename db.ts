import { Sequelize } from "sequelize";

//const { Sequelize } = require('sequelize');
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_PORT || !process.env.DB_HOST) {
    throw new Error('DB_NAME or DB_USER or DB_PASSWORD or DB_PORT or DB_HOST not defined');
}
const port: number = parseInt(process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: port,
        dialectOptions: {
            connectTimeout: 60000
        },
        logging: (msg) => {
            console.log(`Postgress${msg}`);
        }
    },

);

export { sequelize };