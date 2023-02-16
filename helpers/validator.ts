class Validator {
    private nameRegex = /^[a-z ,.'-]+$/i
    private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    private passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    public validateEmail(email: string): boolean {
        return this.emailRegex.test(email);
    }
    public validatePassword(password: string): boolean {
        return this.passwordRegex.test(password);
    }
    public validateName(name: string): boolean {
        return this.nameRegex.test(name);
    }
}

export default new Validator();