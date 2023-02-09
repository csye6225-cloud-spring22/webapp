

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

  
  next();
};

export { checkContentPutUser };