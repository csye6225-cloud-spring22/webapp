

import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkContentPutUser = async (req, res, next) => {
  const { first_name, last_name, password } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    password === undefined 
  ) {
    logger.error("Enter all attributes correctly");
    throw new badRequestException("Enter all attributes correctly ");
  }

  
  next();
};

export { checkContentPutUser };