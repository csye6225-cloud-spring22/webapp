import badRequestException from "../error_handling/badRequest.js";
import Forbidden from "../error_handling/Forbidden.js";
import sameEmailFound from "../error_handling/sameEmailFound.js";
import urlNotFoundError from "../error_handling/urlNotFound.js";
import { findIfEmailExist } from "../service/userService.js";
import { logger } from "../winston/winston-log.js";

const FIEEMiddleWare = async (req, res, next) => {

  const { username } = req.body;

  const response = await findIfEmailExist(username);

  if (response !== null) {
    logger.error(`This email already exists:  ${username}`);
    throw new sameEmailFound(`This email already exists:  ${username}`);
    
  } else {
    next();
  }
   
};

export { FIEEMiddleWare };


