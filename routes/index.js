const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const router = new require('express')();

router.use('/v1/auth', authRouter);
router.use('/v1', adminRouter);

module.exports = router;