const express = require("express");
const authenticationRouter = express.Router();

const { signUp, logIn } = require("../controllers/authentication");

authenticationRouter.post("/signup", signUp);

authenticationRouter.post("/login", logIn);

module.exports = authenticationRouter;
