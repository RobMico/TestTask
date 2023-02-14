//https://dev.to/jobizil/encrypt-and-decrypt-data-in-nodejs-using-aes-256-cbc-2l6d

const argon2 = require('argon2');
const crypto = require('crypto');

const { SECRET_KEY, SECRET_IV } = process.env, ENCRYPTION_METHOD = 'aes-256-cbc';

if (!SECRET_KEY || !SECRET_IV || !ENCRYPTION_METHOD) {
    throw new Error('secretKey, secretIV, and ecnryptionMethod are required');
}

// Generate secret hash with crypto to use for encryption
const key = crypto
    .createHash('sha512')
    .update(SECRET_KEY)
    .digest('hex')
    .substring(0, 32);
const encryptionIV = crypto
    .createHash('sha512')
    .update(SECRET_IV)
    .digest('hex')
    .substring(0, 16);


const cryptor = {
    encryptPassword: async function (password) {
        const hash = await argon2.hash(password);//Argon2id - default
        return this.encryptDataAES256(hash);
    },
    comparePassword: async function (pass, encryptedHash) {

        const decryptedHash = this.decryptDataAES256(encryptedHash);
        const res = await argon2.verify(decryptedHash, pass);
        return res;
    },
    encryptDataAES256: function (data) {
        const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV);
        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64'); // Encrypts data and converts to hex and base64
    },
    decryptDataAES256: function (encryptedData) {
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, encryptionIV);
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        ); // Decrypts data and converts to utf8
    }
};

module.exports = cryptor;