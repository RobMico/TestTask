import express from 'express';
import adminController from '../controllers/adminController';
const adminRouter = express.Router();

adminRouter.get('/health', adminController.checkRAM);

export default adminRouter;