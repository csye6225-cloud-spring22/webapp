

import badRequestException from "../error_handling/badRequest.js";

const quantityCheck = async (req, res, next) => {
  const { quantity } = req.body;

//   const isNumeric = function (str) {
//     if (typeof str != "string") return false; // we only process strings!
//     return (
//       !isNaN(str) && // use type coercion to parse the entirety of the string (`parseFloat` alone does not do this)...
//       !isNaN(parseFloat(str))
//     ); // ...and ensure strings of whitespace fail
//   };
    if(quantity !== undefined || quantity!== null)
    {
        if(!Number.isInteger(quantity)){
        throw new badRequestException(
        "Please give the valid number for quantity"
        
    );
        }
  }
  next();
};

export { quantityCheck };