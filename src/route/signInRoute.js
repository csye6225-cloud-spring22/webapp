import { Router } from "express";
import { FIEEMiddleWare } from "../middleware/FindEmail.js";

const router = Router();

router.post("/try", async (req, res) => {
  const { username, password } = req.body;

  const base64Encoded = Buffer.from(username + ":" + password).toString(
    "base64"
  );

  res.send({ base64Encoded }); 
});

router.post("/testnew", FIEEMiddleWare, async (req, res)   => {

    res.send("Hello There");

})


export { router as signInRoute };