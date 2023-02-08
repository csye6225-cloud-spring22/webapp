
import Forbidden from "../error_handling/Forbidden.js";
import NotFoundError from "../error_handling/NotFoundError.js";
import badRequestException from "../error_handling/badRequest.js";
import { getProductById } from "../service/productService.js";

const checkProductIdOwnerId = async (req, res, next) => {
  
    const { productId } = req.params;

    const owner = req.response;

    const product = await getProductById(productId);

    if (product === null || product === undefined) {
      throw new NotFoundError(
        "Product with given id not found : " + productId
      );
    }

    if (owner.id !== product.dataValues.owner_user_id) {
      throw new Forbidden(
        "Forbidded access to edit the following product id: " + productId
      );
    }

    next();
  } 

export { checkProductIdOwnerId };