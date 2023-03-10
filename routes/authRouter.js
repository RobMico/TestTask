const authController = require("../controllers/authController");
const router = new require('express')();

router.post('/sign-up', authController.registration);
router.post('/sign-in', authController.checkPass);

module.exports = router;