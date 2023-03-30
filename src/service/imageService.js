import { deletingfileN, fileUpload } from "./awsupload.js";
import { Image } from "../model/Image.js";
import { deleteFile } from "../util/s3_aws_util.js";
import { Product } from "../model/Product.js";
import BadRequestException from "../error_handling/badRequest.js";
import badRequestException from "../error_handling/badRequest.js";
import {v4} from "uuid";
import { logger } from "../winston/winston-log.js";
const image_create = async (file, productId, detailsUser) => {
  try {
    const productd = await Product.findByPk(productId);
    const namefile= `UserID:${detailsUser.id}/ProductID:${productd.id}/${v4()}/${file.originalname}`;

    console.log(namefile);

    const responseexist = await ifImageExist(namefile);
 
  if (responseexist) {
    logger.error( "Image already exists for this product: " + productId);
    throw new BadRequestException(
        "Image already exists for this product: " + productId
      );}

    const result = await fileUpload(file, productd, namefile);
    
    console.log(result);


    const imageResponse = await Image.create({
      product_id: productId,
      s3_bucket_path: result.Location,
      file_name: namefile,
      date_created: Date.now(),
    });

    console.log(imageResponse);

    return imageResponse;
  } catch (err) {
    logger.error( "Image can't be created" );
    throw new badRequestException(err);
    console.log(err);

  }
};
const imageAllDetails = async (product_id) => {
    try {
      const response = await Image.findAll({attributes: ["image_id",
      "product_id",
      "file_name",
      "date_created",
      "s3_bucket_path"], where: {product_id}
      });
      return await response;
    } catch (err) {
      logger.error( "Image details can't be fetched" );
      console.log("Image details can't be fetched");
    }
  };
  const imageDetails = async (product_id, image_id) => {
    try {
      const response = await Image.findAll({attributes: ["image_id",
      "product_id",
      "file_name",
      "date_created",
      "s3_bucket_path"], where: {product_id:product_id, image_id:image_id}
      });
      return await response;
    } catch (err) {
        console.error(err);
      logger.error( "Image details can't be fetched" );
      console.log("Image details can't be fetched");
    }
  };
  const ifImageExist = async (file_name) => {
    try {
      const response = await Image.findOne({ where: { file_name } });
      return await response;
    } catch (err) {
      logger.error( "Image already exists" );
      console.error("Image already exists");
    }
  };
  const productIdexistImage = async (imageId) => {


    try {
      const response = await Image.findOne({ where: { image_id : imageId } });
      return await response;
    } catch (err) {
      logger.error( "Product doesn't exist" );
      console.error("Product doesn't exist");
    }
  };
  const deleteimageId = async (productId,image_id) => {
    try {
        const filen = await Image.findByPk(image_id);

        const fileNamedelete = filen.dataValues["file_name"];

        console.log(fileNamedelete)
        console.log(filen);
        const deletingfile = await deletingfileN(fileNamedelete);

      const response = await Image.destroy({
        where: {
          product_id: productId,
          image_id:image_id
        }
      });
      
      console.log(response);
      console.log("r u passing by here");

      return await response;
    } catch (err) {
      logger.error( "Image details can't be deleted" );
      console.error("Image details can't be deleted: " + err);
    }
  };

const ImageDelete = async () => {};

export { image_create, ImageDelete, imageAllDetails, imageDetails, deleteimageId, productIdexistImage, ifImageExist};
