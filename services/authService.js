const cryptor = require("../helpers/cryptor");
const userRepository = require("../models/user");

const authService = {
    createUser: async function (name, email, password) {
        const encryptedPass = await cryptor.encryptPassword(password);
        const user = await userRepository.create({ name: name, password: encryptedPass, email: email });
        return user;
    },
    checkUserPassword: async function (email, password) {
        const candidate = await userRepository.findOne({ where: { email: email } });
        if (!candidate) {
            throw new Error('Such user not exists');
        }
        const compare = await cryptor.comparePassword(password, candidate.password);
        return compare;
    }
};

module.exports = authService;