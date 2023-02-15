const adminService = require("../services/adminService");
const indexController = {
    checkRAM:async function(req, res){
        // let serverState = {
        //     totalMem:os.totalmem(),
        //     freeMem:os.freemem()
        // };
        const freeMem = await adminService.getFreeRAM();
        return res.json(freeMem);
    }
};

module.exports = indexController;