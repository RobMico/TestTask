import validator from "../helpers/validator";

export default class createUserDto {
    constructor(obj: any) {
        if (obj.name && typeof obj.name === 'string') {
            this.name = obj.name;
        }

        if (obj.email && typeof obj.email === 'string') {
            this.email = obj.email;
        }

        if (obj.password && typeof obj.password === 'string') {
            this.password = obj.password;
        }
    }

    public email: string;
    public password: string;
    public name: string;
    public validate(): boolean {
        if (!this.email || !this.password || !this.name) {
            return false;
        }
        return validator.validateEmail(this.email)
            && validator.validateName(this.name)
            && validator.validatePassword(this.password);
    }

}