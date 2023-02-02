import BadRequestException from "../error_handling/BadRequest.js";

const checkIdUrl = async (req, res, next) => {
  const isNumeric = function (str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the entirety of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  if (!isNumeric(req.params.userId)) {
    throw new BadRequestException(
      "Please give the valid number of the user id in the url"
    );
  }

  next();
};

export { checkIdUrl };