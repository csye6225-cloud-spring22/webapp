import customError from "./customError.js";

class urlNotFoundError extends customError {
  statusCode = 404;

  constructor(message) {
    super(message);
  }

  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export default urlNotFoundError;