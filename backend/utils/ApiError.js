class ApiError extends Error {
    constructor(statusCode, success, message, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.success = success;
        this.errors = errors || message ;
      }
}


export {ApiError}