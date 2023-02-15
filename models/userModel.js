class User {
    constructor(user) {
        this.username = this.isNotNull(user.username)
        this.password = this.isNotNull(user.password)
        this.email = this.isNotNull(user.email) && this.isValidEmail(user.email)
        this.timestamp = new Date()
    }

    isNotNull(str) {
        return str.length != 0 ? str : new Error("Required field !");
    }

    isValidEmail(email) {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.match(emailFormat) ? email : new Error("Enter valid email !"); 
    }
}

export default User;