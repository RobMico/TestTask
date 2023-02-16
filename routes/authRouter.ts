import express from 'express';
import authController from '../controllers/authController';
const authRouter = express.Router();

authRouter.post('/sign-up', authController.registration);
authRouter.post('/sign-in', authController.checkPass);

export default authRouter;