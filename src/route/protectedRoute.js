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

const router = Router();


router.put("/v1/user/:userId", emptyContentPut, checkIdUrl, checkAuthorization, PayloadKeyValue, checkPasswordRegex, async (req, res) => {
  const { id } = req.response;

  console.log("In the response: "+req.response);

  if (id.toString() !== req.params.userId) {
    //console.log("Inside if")
    throw new Forbidden("Forbidden Access");
  }

  const response = await updatingGivenFields(req.body, req.params.userId);

  res.status(204).send();
});


router.get("/v1/user/:userId", checkIdUrl, checkAuthorization, async (req, res) => {
  const { id } = req.response;

  // console.log("In the response: "+req.response);

  if (id.toString() !== req.params.userId) {
    //console.log("Inside if")
    throw new Forbidden("Forbidden Access");
  }
  
  const userDetails = await getUserById(req.params.userId);

  delete userDetails.dataValues["password"];

  res.status(200).send(userDetails);
});

export { router as ProtectedRoutes };