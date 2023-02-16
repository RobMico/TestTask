import authService from '../services/authService';
import { Request, Response } from 'express';
import createUserDto from '../dto/createUser-dto';
import checkPasswordDto from '../dto/checkPassword-dto';

class IndexController {
    async registration(req: Request, res: Response) {
        const dto = new createUserDto(req.body);
        if (!dto.validate()) {
            return res.status(400).send('Validation failed');
        }
        try {
            const user = await authService.createUser(dto);
            return res.json(user);
        }
        catch (ex) {
            console.log(ex);
            return res.status(400).send('Bad request');
        }
    }
    async checkPass(req: Request, res: Response) {
        const dto= new checkPasswordDto(req.body);
        if (!dto.validate()) {
            return res.status(400).send('Validation failed');
        }
        try {
            const compare = await authService.checkUserPassword(dto);
            return res.json(compare);
        }
        catch (ex) {
            console.log(ex);
            return res.status(400).send('Bad request');
        }
    }
}

export default new IndexController();