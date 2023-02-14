const adminController = require("../controllers/adminController");
const router = new require('express')();

router.get('/health', adminController.checkRAM);

module.exports = router;