import { hashSync,compare } from "bcrypt";

class hash_pwd {
  static toHash = async (password) => {
    console.log("toHash-Inside ");
    const hash = await hashSync(password, 10);
    return await hash;
  };
  static comparePassword = async(webprovidedpwd, hashpwd) => {
    const pwd_m= await compare(webprovidedpwd,hashpwd);
    return pwd_m;
  };
 
}

export default hash_pwd;