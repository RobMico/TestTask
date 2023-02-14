const authController = require("../controllers/authController");
const router = new require('express')();

router.post('/sign-up', authController.registration);

module.exports = router;