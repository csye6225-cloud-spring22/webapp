import { Router } from "express";
import { user_create, getAllUsersDetails } from "../service/userService.js";
import { encrypt_password } from "../middleware/encryption.js";
import { FIEEMiddleWare } from "../middleware/FindEmail.js";
import badRequestException from "../error_handling/badRequest.js";
import { checkEmailRegex } from "../middleware/emailRegexMW.js";
import { checkPasswordRegex } from "../middleware/passwordRegexMW.js";
import { emptyContent } from "../middleware/postContentError.js";

const router = Router();

  router.post("/v1/user", emptyContent, checkEmailRegex,
  checkPasswordRegex,FIEEMiddleWare, encrypt_password, async (request, response) => {
      const returned_data = await user_create(request.body);
      delete returned_data.dataValues["password"];
      response.status(201).send(returned_data);
    // response.send();
    }
  );


router.get("/healthz", async (request, respond) => {
    // throw new badRequestException("Hello there");
    respond.status(200).send();
  });


export { router as userRouter };








