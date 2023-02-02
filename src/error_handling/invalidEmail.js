import CustomError from "./customError.js";

class invalidEmail extends CustomError {
  statusCode = 400;

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

export default invalidEmail;