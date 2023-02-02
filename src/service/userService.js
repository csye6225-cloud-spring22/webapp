import { User } from "../model/User.js";
import BadRequestException from "../error_handling/badRequest.js";

import hash_pwd from "../util/hash_pwd.js";

const user_create = async (body) => {
  const { first_name, last_name, username, password } = body;
  const account_created = Date.now();
  
  const account_updated = Date.now();

  try {
    const response = await User.create({
      first_name,
      last_name,
      username,
      password,
      account_created,
      account_updated,
    });

    return await response;
  } catch (err) {
    console.log("Account creation failed");
  }
};
const getAllUsersDetails = async () => {
  try {
    const response = await User.findAll({
      attributes: ["first_name", "last_name", "username"],
    });
    return await response;
  } catch (err) {
    console.log("User details can't be fetched");
  }
};
const getUserById = async (userId) => {
    try {
      const response = await User.findByPk(userId);
      return await response;
    } catch (err) {
      console.error("User details can't be fetched by Id: " + err);
    }
  };
 

const findIfEmailExist = async (username) => {
    try {
      const response = await User.findOne({ where: { username } });
      return await response;
    } catch (err) {
      console.error("Failed to extract details");
    }
  };
 


const updatingGivenFields = async (body, id) => {
    const {
      first_name,
      last_name,
      password,
      username,
      account_created,
      account_updated,
    } = body;
  
    console.log("Username: "+username);

    if (
      username !== undefined ||
      account_created !== undefined ||
      account_updated !== undefined
    ) {
      throw new BadRequestException(
        "Can't update the following fields: username, account_created or account_updated"
      );
    }

  
    const hashedPassword = await hash_pwd.toHash(password);
  
    try {
      const response = await User.update(
        {
          first_name,
          last_name,
          password: hashedPassword,
          account_updated: Date.now(),
        },
        {
          where: {
            id: id,
          },
        }
      );
  
      return await response;
    } catch (err) {
      console.error("Failed To Extract the given fields");
    }
  };
export { user_create, getUserById, getAllUsersDetails,findIfEmailExist, updatingGivenFields };
