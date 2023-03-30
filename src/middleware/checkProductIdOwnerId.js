
import Forbidden from "../error_handling/Forbidden.js";
import NotFoundError from "../error_handling/NotFoundError.js";
import badRequestException from "../error_handling/badRequest.js";
import { getProductById } from "../service/productService.js";
import { logger } from "../winston/winston-log.js";

const checkProductIdOwnerId = async (req, res, next) => {
  
    const { productId } = req.params;

    const owner = req.response;

    const product = await getProductById(productId);

    if (product === null || product === undefined) {
      logger.error( "Product with given id not found : " + productId);
      throw new NotFoundError(
        "Product with given id not found : " + productId
      );
    }

    if (owner.id !== product.dataValues.owner_user_id) {
      logger.error( "Forbidded access to edit the following product id: " + productId);
      throw new Forbidden(
        "Forbidded access to edit the following product id: " + productId
      );
    }

    next();
  } 

export { checkProductIdOwnerId };