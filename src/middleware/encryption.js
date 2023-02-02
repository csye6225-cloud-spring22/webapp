import Hash_pwd from "../util/hash_pwd.js";

const encrypt_password = async (req, res, next) => {
  const { password } = req.body;

  console.log("inside the Middleware");

  const encrypted_password = await Hash_pwd.toHash(password);

  req.body["password"] = await encrypted_password;

  next();
};

export { encrypt_password };