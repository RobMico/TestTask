const cryptor = require("../helpers/cryptor");
const userRepository = require("../models/user");

const indexController = {
    registration: async function (req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('Bad request');
        }
        try {
            const encryptedPass = await cryptor.encryptPassword(password);
            console.log(encryptedPass);
            const user = await userRepository.create({ name: name, password: encryptedPass, email: email });
            return res.json(user);
        }
        catch (ex) {
            console.log(ex);
            return res.status(400).send('Bad request');
        }
    },
    checkPass: async function (req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('Bad request');
        }
        try {
            const candidate = await userRepository.findOne({ where: { email: email } });
            if (!candidate) {
                return res.status(400).send('Bad request');
            }
            const compare = await cryptor.comparePassword(password, candidate.password);
            return res.json(compare);
        }
        catch (ex) {
            console.log(ex);
            return res.status(400).send('Bad request');
        }
    }
};

module.exports = indexController;