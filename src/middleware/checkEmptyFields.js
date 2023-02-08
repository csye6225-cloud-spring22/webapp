// import badRequestException from "../error/BadRequest.js";

import badRequestException from "../error_handling/badRequest.js";

const checkEmptyFields = async (req, res, next) => {
  const { name, description, sku, manufacturer, quantity } = req.body;

if (
    name === "" ||
    description === "" ||
    sku === "" ||
    manufacturer === "" ||
    quantity === ""
  ) {
    throw new badRequestException(
      "You can't enter empty value for any attribute"
    );
  }
  if (Object.keys(req.body).length > 5) {
    throw new badRequestException("Enter only required fields");
  }
  next();
};

export { checkEmptyFields };