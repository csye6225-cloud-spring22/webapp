class customError extends Error {
    statusCode;
  
    constructor(message) {
      super(message);
    }
  
    serializeError() {}
  }
  
  export default customError;