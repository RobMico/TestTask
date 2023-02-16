import validator from "../helpers/validator";

export default class checkPasswordDto {
    constructor(obj: any) {
        if (obj.email && typeof obj.email === 'string') {
            this.email = obj.email;
        }
        if (obj.password && typeof obj.password === 'string') {
            this.password = obj.password;
        }
    }
    public email: string;
    public password: string;
    public validate(): boolean {
        if (!this.email || !this.password) {
            return false;
        }
        return validator.validateEmail(this.email)
            && validator.validatePassword(this.password);
    }

}