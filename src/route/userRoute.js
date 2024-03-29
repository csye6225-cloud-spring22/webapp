import { Router } from "express";
import { user_create, getAllUsersDetails } from "../service/userService.js";
import { encrypt_password } from "../middleware/encryption.js";
import { FIEEMiddleWare } from "../middleware/FindEmail.js";
import badRequestException from "../error_handling/badRequest.js";
import { checkEmailRegex } from "../middleware/emailRegexMW.js";
import { checkPasswordRegex } from "../middleware/passwordRegexMW.js";
import { emptyContent } from "../middleware/postContentError.js";
import { checkContentPutUser } from "../middleware/checkPutUser.js";
import { checkPostLengthUser } from "../middleware/checklengthPostUser.js";
import { checkContentPostUser } from "../middleware/checkPostUser.js";
import { logger } from "../winston/winston-log.js";
import { statsd_client } from "../statsD/statsd.js";

const router = Router();

  router.post("/v3/user", emptyContent, checkContentPostUser, checkPostLengthUser, checkEmailRegex,
  checkPasswordRegex,FIEEMiddleWare, encrypt_password, async (request, response) => {

  
      const returned_data = await user_create(request.body);
      delete returned_data.dataValues["password"];
      logger.info("User Creation successful" + JSON.stringify(returned_data));
      statsd_client.increment("myapp_new.userCreated");
      response.status(201).send(returned_data);
    // response.send();
    }
  );


router.get("/healthz", async (request, respond) => {
    // throw new badRequestException("Hello there");
    statsd_client.increment("myapp_new.healthz");
    logger.info("Checking Healthz");
    respond.status(200).send();
  });
router.get("/dummy4", async (request, respond) => {
    // throw new badRequestException("Hello there");
    // statsd_client.increment("myapp_new.healthz");
    logger.info("Checking Dummy");
    respond.status(200).send();
  });


export { router as userRouter };








