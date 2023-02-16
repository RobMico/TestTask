import express from "express";
import authRouter from './authRouter';
import adminRouter from "./adminRouter";
const indexRouter = express();


indexRouter.use('/v1/auth', authRouter);
indexRouter.use('/v1', adminRouter);

export default indexRouter;