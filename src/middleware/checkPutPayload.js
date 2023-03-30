import BadRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const PayloadKeyValue = async (req, res, next) => {
  const { first_name, last_name, password } = req.body;

  if (first_name !== undefined) {
    if (first_name.length === 0) {
      logger.error("Please give something in the first name");
      throw new BadRequestException("Please give something in the first name");
    }
  }

  if (last_name !== undefined) {
    if (last_name.length === 0) {
      logger.error("Please give something in the last name");
      throw new BadRequestException("Please give something in the last name");
    }
  }

  if (password !== undefined) {
    if (password.length === 0) {
      logger.error("Please give something in the password");
      throw new BadRequestException("Please give something in the password");
    }
  }

  next();
};

export { PayloadKeyValue };