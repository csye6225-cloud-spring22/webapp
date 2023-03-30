

import NotFoundError from "../error_handling/NotFoundError.js";
import { imageDetails  } from "../service/imageService.js";
import { logger } from "../winston/winston-log.js";


const checkImageexist = async (req, res, next) => {
  const {image_id} = req.params;

  const { productId } = req.params;

    const checkIfExists = await imageDetails(productId,image_id);

    if(checkIfExists === null || checkIfExists === undefined|| checkIfExists.length === 0){
        console.log("r u inside if");
        logger.error("Given Image ID Not Found");
        throw new NotFoundError("Given Image ID Not Found");
    }

    

    next();
  } 

export { checkImageexist };