import NotAuthorizedError from "../error_handling/Notauthorized.js";
import { findIfEmailExist } from "../service/userService.js";
import hash_pwd from "../util/hash_pwd.js";
import { logger } from "../winston/winston-log.js";

const checkAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
    
  if (authorization === undefined) {
    logger.error("authorization code not found");
    throw new NotAuthorizedError("authorization code not found");
  }

  const authorizationToken = authorization.split(" ")[1];

  console.log("This is an authorized Code: " + authorizationToken);

  const stringValue = Buffer.from(authorizationToken, "base64").toString();

  const [username, password] = stringValue.split(":");
  console.log(username);

  const response = await findIfEmailExist(username);
  console.log(response);
 
  if (response === null) {
    logger.error("Invalid Email Address");
    throw new NotAuthorizedError("Invalid Email Address");
  } else {
    const pwd_m = await hash_pwd.comparePassword(
      password,
      response.password
    );

    

    if (!pwd_m) {
      logger.error("Password given is invalid");
      throw new NotAuthorizedError("Password given is invalid");
    }
  }


  req.response = response;
  
  next();
};

export { checkAuthorization };