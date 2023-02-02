import badRequestException from "../error_handling/badRequest.js"


const emptyContentPut = async(req,res,next) => { 

    if(req.body && Object.keys(req.body).length === 0 && Object.getPrototypeOf(req.body) === Object.prototype)
    {
        throw new badRequestException("Empty content/payload");
    }
    next();
};
export{emptyContentPut};
