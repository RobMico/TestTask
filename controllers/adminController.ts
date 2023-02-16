//const adminService = require("../services/adminService");
import adminService from '../services/adminService';
import { Request, Response } from 'express';

class IndexController {
    async checkRAM(req: Request, res: Response) {
        let freeMem = await adminService.getFreeRAM();
        return res.json(freeMem);
    }
}

export default new IndexController();