import BadRequestException from "../error_handling/badRequest.js";

const checkPasswordRegex = async (req, res, next) => {
  const { password } = req.body;
  if (password === "") {
    
    throw new BadRequestException("Password not provided");
  }

  // Min 5 Characters, At least one letter and one number
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);


  if (!passwordRegex.test(password) ) {
    
    throw new BadRequestException(
      "Provide password of length 5 with atleast one alphabet and one number");
  }
  next();
};

export { checkPasswordRegex };