import { Router } from "express";
import mutler from "multer";
import NotFoundError from "../error_handling/NotFoundError.js";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { checkIidUrl } from "../middleware/checkIidUrl.js";
import { checkImageexist } from "../middleware/checkImageexist.js";
import { checkPidUrl } from "../middleware/checkPidUrl.js";
import { checkProductIdOwnerId } from "../middleware/checkProductIdOwnerId.js";
// import { fileUpload} from "../service/awsupload.js";
const upload = mutler({dest :"uploads/"});
import {imageAllDetails, image_create, imageDetails, deleteimageId, productIdexistImage, ifImageExist } from "../service/imageService.js" ;
// import { productIdexist } from "../service/productService.js"


const router = Router();



router.post("/v1/product/:productId/image", checkAuthorization,checkProductIdOwnerId,upload.single("imagefile"), async (req, res) => {
    const file=req.file;
    console.log("r u here in first step");
    // if (file==null || file == undefined)
    // {
    //     throw new badRequestException("Upload a file. Don't leave it empty");
    // }

    const response= await image_create(file,req.params.productId,req.response);
    res.status(201).send(response);
}
);

router.get("/v1/product/:productId/image",checkAuthorization,checkProductIdOwnerId, checkPidUrl, async (req, res) => {
    const {productId} = req.params;
    // const checkIfExists = await productIdexistImage(productId);
    // if(checkIfExists === null || checkIfExists === undefined){
    //     throw new NotFoundError("Given Product ID Not Found");
    // }
    const imageADetails = await imageAllDetails(req.params.productId); 
    res.status(200).send(imageADetails);
  });

router.get("/v1/product/:productId/image/:image_id",checkAuthorization,checkProductIdOwnerId, checkImageexist,checkPidUrl,checkIidUrl, async (req, res) => {
    // const {productId} = req.params;
    // const checkIfExists = await productIdexistImage(req.params.image_id);
    // if(checkIfExists === null || checkIfExists === undefined){
    //     throw new NotFoundError("Given Product ID Not Found");
    // }
    const theImageDetails = await imageDetails(req.params.productId, req.params.image_id); 



    res.status(200).send(theImageDetails);
  });

  router.delete("/v1/product/:productId/image/:image_id",checkAuthorization,checkProductIdOwnerId, checkImageexist,checkPidUrl,checkIidUrl, async (req, res) => {
    const {image_id} = req.params;
//    const { productId, imageId } = request.params;

    // const checkIfExists = await productIdexistImage(image_id);
    // if(checkIfExists === null || checkIfExists === undefined){
    //     console.log("r u inside if");
    //     throw new NotFoundError("Given Product ID Not Found");
    // }
    const deleting_image = await deleteimageId(req.params.productId, req.params.image_id); 

    res.status(204).send();
  });



export {router as RouteImage};
    