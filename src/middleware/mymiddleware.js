import badRequestException from "../error_handling/badRequest.js"

const myMiddleWare = async (req, res, next) => {
    throw new badRequestException("This is the bad exception");
}


export {myMiddleWare}

