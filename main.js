require('dotenv').config({ path: '.' + process.env.NODE_ENV + '.env' });
const sequelize = require('./db');
const express = require('express');
const PORT = process.env.PORT || 5000;
const indexRouter = require('./routes/index');

const app = express();
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

//npx sequelize-cli db:migrate          --migrate
//npx sequelize-cli db:migrate:undo     --undo migrate
//docker exec testtask_server_1 /bin/bash -c "NODE_ENV=production npx sequelize-cli db:migrate"         --docker migration