const authService = require("../services/authService");

const indexController = {
    registration: async function (req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('Bad request');
        }
        try {
            const user = await authService.createUser(name, email, password);
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
            const compare = await authService.checkUserPassword(email, password);
            return res.json(compare);
        }
        catch (ex) {
            console.log(ex);
            return res.status(400).send('Bad request');
        }
    }
};

module.exports = indexController;