
import BadRequestException from "../error_handling/badRequest.js";
import InvalidEmail from "../error_handling/invalidEmail.js";
import { logger } from "../winston/winston-log.js";

const checkEmailRegex = async (req, res, next) => {
  const { username } = req.body;

  if (username === "") {
    logger.error("Username is not given");
    throw new BadRequestException("Username is not given");
  }
  const emailRegex = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  );

  if (!emailRegex.test(username)) {
    logger.error("Please give valid email address");
    throw new InvalidEmail("Please give valid email address");
  }
  
  next();
};

export { checkEmailRegex };