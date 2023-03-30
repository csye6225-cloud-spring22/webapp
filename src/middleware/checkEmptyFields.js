

import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkEmptyFields = async (req, res, next) => {
  const { name, description, sku, manufacturer, quantity } = req.body;

if (
    name === "" ||
    description === "" ||
    sku === "" ||
    manufacturer === "" ||
    quantity === ""
  ) {
    logger.error("You can't enter empty value for any attribute");
    throw new badRequestException(
      "You can't enter empty value for any attribute"
    );
  }
  if (Object.keys(req.body).length > 5) {
    logger.error("Enter only required fields");
    throw new badRequestException("Enter only required fields");
  }
  next();
};

export { checkEmptyFields };