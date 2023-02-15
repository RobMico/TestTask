const os = require("os");

const adminService = {
    getFreeRAM: async function () {
        return os.freemem();
    }
};
module.exports = adminService;