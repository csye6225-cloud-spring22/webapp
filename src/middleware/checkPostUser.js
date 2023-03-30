

import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkContentPostUser = async (req, res, next) => {
  const { first_name, last_name, password, username } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    password === undefined ||
    username === undefined
  ) {
    logger.error("Enter all attributes correctly");
    throw new badRequestException("Enter all attributes correctly ");
  }

  if (first_name !== undefined) {
    if (first_name.length === 0) {
      logger.error("Please give something in the first_name");
      throw new badRequestException("Please give something in the first_name");
    }
  }

  if (last_name !== undefined) {
    if (last_name.length === 0) {
      logger.error("Please give something in the last_name");
      throw new badRequestException("Please give something in the last_name");
    }
  }

  if (password !== undefined) {
    if (password.length === 0) {
      logger.error("Please give something in the password");
      throw new badRequestException("Please give something in the password");
    }
  }

  if (username !== undefined) {
    if (username.length === 0) {
      logger.error("Please give something in the username");
      throw new badRequestException("Please give something in the username");
    }
  }

  
  next();
};

export { checkContentPostUser };