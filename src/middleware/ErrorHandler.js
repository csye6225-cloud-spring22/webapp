import customError from "../error_handling/customError.js";

const errorHandler = async (err, req, res, next) => {

    console.log("Inside the Error Handler");

  if (err instanceof customError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  res.status(400).send({
    message: "Something went wrong",
  });
};

export { errorHandler };