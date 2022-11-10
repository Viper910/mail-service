const express = require("express");
const authenticationRouter = express.Router();

const { signUp, logIn } = require("../controllers/authentication");


//These router is for Signning up.
authenticationRouter.post("/signup", signUp);

//These router is for Logging in.
authenticationRouter.post("/login", logIn);

module.exports = authenticationRouter;
