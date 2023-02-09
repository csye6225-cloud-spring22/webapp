

import badRequestException from "../error_handling/badRequest.js";

const checkContentPutUser = async (req, res, next) => {
  const { first_name, last_name, password } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    password === undefined 
  ) {
    throw new badRequestException("Enter all attributes correctly ");
  }

  if (Object.keys(req.body).length > 4) {
    console.log("r u here");
    throw new badRequestException("Enter only required fields");
  }

  
  next();
};

export { checkContentPutUser };