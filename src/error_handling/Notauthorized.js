import customError from "./customError.js";

class NotAuthorizedError extends customError {
  statusCode = 401;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export default NotAuthorizedError;