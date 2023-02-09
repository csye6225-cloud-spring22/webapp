

import badRequestException from "../error_handling/badRequest.js";

const checkContentPostUser = async (req, res, next) => {
  const { first_name, last_name, password, username } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    password === undefined ||
    username === undefined
  ) {
    throw new badRequestException("Enter all attributes correctly ");
  }

  if (first_name !== undefined) {
    if (first_name.length === 0) {
      throw new badRequestException("Please give something in the first_name");
    }
  }

  if (last_name !== undefined) {
    if (last_name.length === 0) {
      throw new badRequestException("Please give something in the last_name");
    }
  }

  if (password !== undefined) {
    if (password.length === 0) {
      throw new badRequestException("Please give something in the password");
    }
  }

  if (username !== undefined) {
    if (username.length === 0) {
      throw new badRequestException("Please give something in the username");
    }
  }

  
  next();
};

export { checkContentPostUser };