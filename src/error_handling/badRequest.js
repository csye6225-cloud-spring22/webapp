import customError from "./customError.js";

class badRequestException extends customError {
  statusCode = 400;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export default badRequestException;