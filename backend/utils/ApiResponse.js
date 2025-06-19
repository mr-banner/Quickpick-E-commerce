class ApiResponse {
    constructor(statusCode = 200, data = null, message = "Success", success = true) {
      this.statusCode = statusCode;
      this.data = data;
      this.success = success;
      this.message = message;
    }
  }
  
  export { ApiResponse };
  