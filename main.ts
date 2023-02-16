require('dotenv').config({ path: __dirname + '/.' + process.env.NODE_ENV + '.env' });
import { sequelize } from './db';
import indexRouter from './routes/index';
import express, { Application, Router } from 'express';

const PORT: number | string = process.env.PORT || 5000;
//require('dotenv').config({ path: __dirname+'/.env' });
//console.log(process.env);
//const sequelize = require('./db');
//const express = require('express');
//const indexRouter = require('./routes/index');

const app: Application = express();
app.use(express.json());
app.use('/api', indexRouter);

const start = async () => {
    await sequelize.authenticate();
    await sequelize.sync();

    // eslint-disable-next-line no-unused-vars
    const server = app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    });
};

start();

//recreate db - remove volume(./data folder)
//docker-compose up --build
//npx eslint <file>
//prettier --write <file>
//npx sequelize-cli db:migrate          --migrate
//npx sequelize-cli db:migrate:undo     --undo migrate
//docker exec testtask_server_1 /bin/bash -c "NODE_ENV=production npx sequelize-cli db:migrate"         --docker migration