

import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkContentPut = async (req, res, next) => {
  const { name, description, sku, manufacturer, quantity } = req.body;

  if (
    name === undefined ||
    description === undefined ||
    sku === undefined ||
    manufacturer === undefined ||
    quantity === undefined
  ) {
    logger.error("Enter all attributes correctly ");
    throw new badRequestException("Enter all attributes correctly ");
  }

  if (Object.keys(req.body).length > 5) {
    logger.error("Enter only required fields");
    throw new badRequestException("Enter only required fields");
  }

  next();
};

export { checkContentPut };