

import NotFoundError from "../error_handling/NotFoundError.js";
import { imageDetails  } from "../service/imageService.js";


const checkImageexist = async (req, res, next) => {
  const {image_id} = req.params;

  const { productId } = req.params;

    const checkIfExists = await imageDetails(productId,image_id);

    if(checkIfExists === null || checkIfExists === undefined|| checkIfExists.length === 0){
        console.log("r u inside if");
        throw new NotFoundError("Given Product ID Not Found");
    }

    

    next();
  } 

export { checkImageexist };