import customError from "./customError.js";

class Forbidden extends customError {
  statusCode = 403;

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

export default Forbidden;