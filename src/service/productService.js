import { Product } from "../model/Product.js";
import BadRequestException from "../error_handling/badRequest.js"


const getProductById = async (productId) => {
    try {
      const response = await Product.findByPk(productId);
      return await response;
    } catch (err) {
      console.error("Product details can't be fetched by Id: " + err);
    }
  };

  const deleteProductbyId = async (productId) => {
    try {
      const response = await Product.destroy({
        where: {
          id: productId
        }
      });
      
      return await response;
    } catch (err) {
      console.error("Product details can't be deleted: " + err);
    }
  };

const product_create = async (body,id) => {
    const { name, description,
    sku, manufacturer,quantity} = body;
    const date_added = Date.now();
    const date_last_updated = Date.now();
    const owner_user_id = id;
  
    try {
      const response = await Product.create({
        name,
        description,
        sku,
        manufacturer,
        quantity,
        date_added,
        date_last_updated,
        owner_user_id
      });
      console.log("Creating product");
      return await response;
    } catch (err) {
      console.log("Product creation failed");
      throw new BadRequestException(err+"");
    }
  };
  const productIdexist = async (productId) => {


    try {
      const response = await Product.findOne({ where: { id : productId } });
      return await response;
    } catch (err) {
      console.error("Product doesn't exist");
    }
  };

  const getOwnerId = async (productId) => {
    try {
      const response = await Product.findOne({attributes: ["owner_user_id"], where: {id: productId}});
      return await response;
    } catch (err) {
      console.error("Product details can't be fetched by Id: " + err);
    }
  };
  const updateProductdetails = async (body, productId) => {
    const {
        name,
        description,
        sku,
        manufacturer,
        quantity,
        owner_user_id,
        date_added,
        date_last_updated
    } = body;
  
    console.log("Pid: "+productId);

    if (
      owner_user_id !== undefined ||
      date_added !== undefined ||
      date_last_updated !== undefined
    ) {
      throw new BadRequestException(
        "Can't update the following fields: owner_user_id, account_created or account_updated"
      );
    }
  
    try {
      const response = await Product.update(
        {
          name,
          description,
          sku,
          manufacturer,
          quantity,
          date_last_updated: Date.now()
        },
        {
          where: {
            id: productId,
          },
        }
      );
  
      return await response;
    } catch (err) {
      console.error("Failed To Extract the given fields: "+err);
      throw new BadRequestException(err+"");
    }
  };

  const updateProductdetailsPut = async (body, productId) => {
    const {
        name,
        description,
        sku,
        manufacturer,
        quantity,
        owner_user_id,
        date_added,
        date_last_updated
    } = body;
  
    console.log("Pid: "+productId);

    if (
      owner_user_id !== undefined ||
      date_added !== undefined ||
      date_last_updated !== undefined
    ) {
      throw new BadRequestException(
        "Can't update the following fields: owner_user_id, account_created or account_updated"
      );
    }
    if (
      name == undefined ||
      sku == undefined ||
      manufacturer == undefined ||
      description == undefined ||
      quantity == undefined 
    ) {
      throw new BadRequestException(
        "Can't give undefined field"
      );
    }
  
    try {
      const response = await Product.update(
        {
          name,
          description,
          sku,
          manufacturer,
          quantity,
          date_last_updated: Date.now()
        },
        {
          where: {
            id: productId,
          },
        }
      );
        
      return await response;
    } catch (err) {
      console.error("Failed To Extract the given fields: "+err);
      throw new BadRequestException(err+"");
    }
  };

export { getProductById, product_create, getOwnerId, updateProductdetails, deleteProductbyId, productIdexist, updateProductdetailsPut };
