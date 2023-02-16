import { sequelize } from '../db';
import { DataTypes, Model, Optional, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
//const sequelize = require('../db');
//const { DataTypes } = require('sequelize');

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    email:string;
    password:string;
    createdAt:CreationOptional<Date>;
    updatedAt:CreationOptional<Date>;
    name: string;
}
const UserRepository = sequelize.define<UserModel>('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {createdAt:false, updatedAt:false});

// const User = sequelize.define('user', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
//     password: { type: DataTypes.TEXT, allowNull: false },
//     name: { type: DataTypes.STRING, allowNull: false, validate: { isAlpha: true, len: [2, 30] } },
//     createdAt: { type: DataTypes.DATE },
//     updatedAt: { type: DataTypes.DATE }
// }, { createdAt: false, updatedAt: false });

export {UserModel, UserRepository};