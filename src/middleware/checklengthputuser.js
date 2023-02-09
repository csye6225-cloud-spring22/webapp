

import badRequestException from "../error_handling/badRequest.js";

const checkPutLengthUser = async (req, res, next) => {
  const { name, description, sku, manufacturer, quantity } = req.body;


  if (Object.keys(req.body).length > 3) {
    throw new badRequestException("Enter only required fields");
  }

  next();
};

export { checkPutLengthUser };