class ApiResponse {
    constructor(statusCode = 200, data = null, message = "Success", success = true) {
      this.statusCode = statusCode;
      this.success = success;
      this.message = message;
      this.data = data;
    }
  }
  
  export { ApiResponse };
  