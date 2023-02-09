

import badRequestException from "../error_handling/badRequest.js";

const checkContentPosttUser = async (req, res, next) => {
  const { first_name, last_name, password, username } = req.body;

  if (
    first_name === undefined ||
    last_name === undefined ||
    password === undefined ||
    username === undefined
  ) {
    throw new badRequestException("Enter all attributes correctly ");
  }

  
  next();
};

export { checkContentPosttUser };