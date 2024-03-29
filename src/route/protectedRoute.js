import { Router } from "express";
import { checkAuthorization } from "../middleware/checkAuthorization.js";
import { User } from "../model/User.js";
import { getUserById, updatingGivenFields  } from "../service/userService.js";
import Forbidden from "../error_handling/Forbidden.js";
import { checkPasswordRegex } from "../middleware/passwordRegexMW.js";
import { emptyContent } from "../middleware/postContentError.js";
import { checkIdUrl } from "../middleware/checkIdUrl.js";
import { emptyContentPut } from "../middleware/emptyContentPut.js";
import { PayloadKeyValue } from "../middleware/checkPutPayload.js";
import { checkContentPutUser } from "../middleware/checkPutUser.js";
import { checkPutLengthUser } from "../middleware/checklengthputuser.js";
import { logger } from "../winston/winston-log.js";
import { statsd_client } from "../statsD/statsd.js";

const router = Router();


router.put("/v1/user/:userId", emptyContentPut, checkIdUrl, checkAuthorization, checkContentPutUser,checkPutLengthUser, PayloadKeyValue, checkPasswordRegex, async (req, res) => {
 
  const { id } = req.response;

  console.log("In the response: "+req.response);

  if (id.toString() !== req.params.userId) {
    logger.error("Forbidden Access");
   
    throw new Forbidden("Forbidden Access");
  }

  const response = await updatingGivenFields(req.body, req.params.userId);
  logger.info("User Updated successfully");
  statsd_client.increment("myapp_new.userUpdated");
  res.status(204).send();
});


router.get("/v1/user/:userId", checkIdUrl, checkAuthorization, async (req, res) => {
  const { id } = req.response;


  if (id.toString() !== req.params.userId) {
    logger.error("Forbidden Access");
    throw new Forbidden("Forbidden Access");
  }
  
  const userDetails = await getUserById(req.params.userId);

  delete userDetails.dataValues["password"];
  logger.info("User Details sent successfully");
  statsd_client.increment("myapp_new.userFetched");
  res.status(200).send(userDetails);
});

export { router as ProtectedRoutes };