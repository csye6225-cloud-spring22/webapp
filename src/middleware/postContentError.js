import badRequestException from "../error_handling/badRequest.js";

const emptyContent = async (req, res, next) => {
  const {first_name, last_name, username, password } = req.body;
  if( first_name === undefined || last_name === undefined || username === undefined|| password === undefined )
  {
    throw new badRequestException("Enter user details correctly");
    
  }else {
    next();
  }  
};

export { emptyContent };


