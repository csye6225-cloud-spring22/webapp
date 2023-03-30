import {deleteFile, upload} from "../util/s3_aws_util.js"
import fileStream from "fs";
import util from "util";
import badRequestException from "../error_handling/badRequest.js";
import { logger } from "../winston/winston-log.js";

const unlinking = util.promisify(fileStream.unlink);

const fileUpload = async (fileHere,  product, nameoffile) => {
    try{
        console.log(fileHere);
        const ans = await upload(fileHere,nameoffile);

        await unlinking (fileHere.path);
        return ans;
    } catch(err)
    {
      logger.error("Unable to upload file");
        console.error(err);
    }
    
};
const deletingfileN = async (filename) => {
    try {
      const result = await deleteFile(filename);
      return result;
    } catch (error) {
      logger.error("Error in code: " + error);
      throw new badRequestException("Error in code: " + error);
    }
  };

export {fileUpload,deletingfileN};


