import express from "express";
import "express-async-errors";
import bodyparser from "body-parser";
import { userRouter } from "./route/userRoute.js";


import urlNotFoundError from "./error_handling/urlNotFound.js";
import { errorHandler } from "./middleware/ErrorHandler.js";

import { signInRoute } from "./route/signInRoute.js";
import { ProtectedRoutes } from "./route/protectedRoute.js";
import badRequestException from "./error_handling/badRequest.js";
const app = express();

app.use(bodyparser.json());

app.use(userRouter);
app.use(signInRoute);

app.use(ProtectedRoutes);


app.all("*", async (req) =>{
    throw new urlNotFoundError(`Path Not Found : ${req.url}`);
});

app.get("/just", async (req) => {
    throw new badRequestException("Bad-Request");
})


app.use(errorHandler);

export { app };