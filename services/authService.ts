import { UserRepository } from "../models/user";
import cryptor from '../helpers/cryptor';
import createUserDto from "../dto/createUser-dto";
import checkPasswordDto from "../dto/checkPassword-dto";

class AuthService {
    public async createUser(dto:createUserDto) {
        const encryptedPass = await cryptor.encryptPassword(dto.password);
        const user = await UserRepository.create({ ...dto, password: encryptedPass });
        return user;
    }
    public async checkUserPassword(dto:checkPasswordDto) {
        const candidate = await UserRepository.findOne({ where: { email: dto.email } });
        if (!candidate) {
            throw new Error('Such user not exists');
        }
        const compare = await cryptor.comparePassword(dto.password, candidate.password);
        return compare;
    }
}

export default new AuthService();