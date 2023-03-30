import BadRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const checkPidUrl = async (req, res, next) => {
  const isNumeric = function (str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the entirety of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  if (!isNumeric(req.params.productId)) {
    logger.error("Please give the valid number of the product id in the url");
    throw new BadRequestException(
      "Please give the valid number of the product id in the url"
    );
  }
  next();
};

export { checkPidUrl };