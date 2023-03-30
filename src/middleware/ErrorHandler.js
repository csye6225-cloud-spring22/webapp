import customError from "../error_handling/customError.js";
import { logger } from "../winston/winston-log.js";

const errorHandler = async (err, req, res, next) => {

    console.log("Inside the Error Handler");

  if (err instanceof customError) {
    
    logger.error(
      "Error Status: " +
        err.statusCode +
        " Serialized Error: " +
        JSON.stringify(err.serializeError())
    );
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.log(err);

  res.status(400).send({
    message: "Something went wrong",
  });
};

export { errorHandler };