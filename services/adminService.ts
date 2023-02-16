import * as os from 'os';

class AdminService{
    public async getFreeRAM () {
        return os.freemem();
    }
}

export default new AdminService();