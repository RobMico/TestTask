const os = require("os");

const indexController = {
    checkRAM:async function(req, res){
        // let serverState = {
        //     totalMem:os.totalmem(),
        //     freeMem:os.freemem()
        // };
        return res.json(os.freemem());
    }
};

module.exports = indexController;