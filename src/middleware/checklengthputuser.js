

import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkPutLengthUser = async (req, res, next) => {
  


  if (Object.keys(req.body).length > 3) {
    logger.error("Enter only required fields");
    throw new badRequestException("Enter only required fields");
  }

  next();
};

export { checkPutLengthUser };