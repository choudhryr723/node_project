class ApiError extends Error {
    constaructor(statusCode, message = "Somthing went wring", errors = []) {
        super(message)
        this.statusCode = statusCode;
        this.success = false;
        this.data = null;
        this.errors = this.errors;
        if (stack) {
            this.stack = this.stack;
        } else {
            Error.captureSTackTrace(this, this.constaructor);
        }
    }
}


export { ApiError };