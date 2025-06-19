class ApiError extends Error {
  constructor(statusCode, message, errors = null, success = false) {
    super(message);

    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.errors = errors || message;

    // Capture stack trace (for debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
