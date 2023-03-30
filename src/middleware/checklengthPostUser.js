

import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkPostLengthUser = async (req, res, next) => {


  if (Object.keys(req.body).length > 4) {
    logger.error("Enter only required fields");
    throw new badRequestException("Enter only required fields");
  }

  next();
};

export { checkPostLengthUser };