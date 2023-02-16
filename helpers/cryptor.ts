//https://dev.to/jobizil/encrypt-and-decrypt-data-in-nodejs-using-aes-256-cbc-2l6d
import * as argon2 from 'argon2';
import * as crypto from 'crypto';


class Cryptor {
    private readonly key:string;
    private readonly encryptionIV:string;
    private readonly encryptionMethod:string;
    constructor() {
        const { SECRET_KEY, SECRET_IV } = process.env;
        if (!SECRET_KEY || !SECRET_IV) {
            throw new Error('secretKey or secretIV undefined');
        }

        //our key will be converted to something like 9f05d139aa8895526277342f6b105q51
        // Generate secret hash with crypto to use for encryption
        this.key = crypto
            .createHash('sha512')
            .update(SECRET_KEY)
            .digest('hex')
            .substring(0, 32);
        this.encryptionIV = crypto
            .createHash('sha512')
            .update(SECRET_IV)
            .digest('hex')
            .substring(0, 16);
        this.encryptionMethod = 'aes-256-cbc';
    }
    async encryptPassword (password: string) {
        const hash = await argon2.hash(password);//Argon2id - default
        return this.encryptDataAES256(hash);
    }
    async comparePassword (pass: string, encryptedHash: string) {
        const decryptedHash = this.decryptDataAES256(encryptedHash);
        const res = await argon2.verify(decryptedHash, pass);
        return res;
    }
    private encryptDataAES256 (data: string) {
        const cipher = crypto.createCipheriv(this.encryptionMethod, this.key, this.encryptionIV);
        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64'); // Encrypts data and converts to hex and base64
    }
    private decryptDataAES256 (encryptedData: string) {
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = crypto.createDecipheriv(this.encryptionMethod, this.key, this.encryptionIV);
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        ); // Decrypts data and converts to utf8
    }

}

export default new Cryptor();