import { Router } from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { checkPidUrl } from "../middleware/checkPidUrl.js";
import { getProductById, product_create , getOwnerId, updateProductdetails, deleteProductbyId, productIdexist, updateProductdetailsPut } from "../service/productService.js";
import Forbidden from "../error_handling/Forbidden.js";
import NotFoundError from "../error_handling/NotFoundError.js";
import badRequestException from "../error_handling/badRequest.js";
import { checkContentPut } from "../middleware/checkContentPut.js";
import { checkEmptyFields } from "../middleware/checkEmptyFields.js";
import { checkProductIdOwnerId } from "../middleware/checkProductIdOwnerId.js";
import { emptyContentPut } from "../middleware/emptyContentPut.js";
import { quantityCheck } from "../middleware/quantityCheck.js";
import { logger } from "../winston/winston-log.js";
import { statsd_client } from "../statsD/statsd.js";


const router = Router();

router.get("/v1/product/:productId", checkPidUrl, async (req, res) => {
    const {productId} = req.params;
    const checkIfExists = await productIdexist(productId);
    if(checkIfExists === null || checkIfExists === undefined){
      logger.error("Given Product ID Not Found");
        throw new NotFoundError("Given Product ID Not Found");
    }
    const productDetails = await getProductById(req.params.productId); 
    logger.info("Product details sent successfully");
    statsd_client.increment("myapp_new.productFetched");
    res.status(200).send(productDetails);
  });
router.delete("/v1/product/:productId", checkAuthorization,checkPidUrl,checkProductIdOwnerId, async (req, res) => {
    const {productId} = req.params;
   
    const temp = await deleteProductbyId(req.params.productId); 
    logger.info("Product details deleted successfully");
    statsd_client.increment("myapp_new.productDeleted");
    res.status(204).send();
  });


router.post("/v1/product", checkAuthorization, checkEmptyFields,checkContentPut,quantityCheck, async (req, res) => {
    const { id } = req.response;
  
    console.log("In the response: "+id);
    const response = await product_create(req.body, id);



    console.log(response);
    logger.info("Product created successfully");
    statsd_client.increment("myapp_new.productCreated");
    res.status(201).send(response);
  });

  router.patch("/v1/product/:productId", checkPidUrl, checkAuthorization, checkProductIdOwnerId, emptyContentPut, checkEmptyFields,quantityCheck, async (req, res) => {
    const { id } = req.response;
    const {quantity} = req.response;
  
    const response = await updateProductdetails(req.body, req.params.productId);
    logger.info("Product details updated successfully");
    statsd_client.increment("myapp_new.productUpdatedPatch");
    res.status(204).send();
  });

  router.put("/v1/product/:productId", checkPidUrl,checkAuthorization, checkProductIdOwnerId,emptyContentPut, checkContentPut, checkEmptyFields,quantityCheck, async (req, res) => {
    const { id } = req.response;
    const response = await updateProductdetailsPut(req.body, req.params.productId);
    logger.info("Product details updated successfully");
    statsd_client.increment("myapp_new.productUpdatedPut");
    res.status(204).send();
  });
  
  
 export {router as ProductRoutes}; 