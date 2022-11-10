const express = require("express");
const { mongo } = require("mongoose");
const {
  fetchInbox,
  fetchSentmessage,
  postSendMessage,
  deleteInboxById,
  deleteSentbyId,
} = require("../controllers/message");
const isAuth = require("../middleware/isAuth");
const User = require("../models/user");

const messsageRouter = express.Router();
//isAuth is a middleware to check weather our user is customer for our service i.e. is He/she is logged in or not.

//For fetching inbox data from database.
messsageRouter.get("/inbox", isAuth, fetchInbox);

//For deleting a inbox mail we pass id through url
messsageRouter.delete("/inbox/:id", isAuth, deleteInboxById);

//For deleting a sent mail we pass id through url
messsageRouter.delete("/sent/:id", isAuth, deleteSentbyId);

//For fetching all sent mail from database.
messsageRouter.get("/sent", isAuth, fetchSentmessage);

//For composing a new mail.
messsageRouter.post("/sendmessage", isAuth, postSendMessage);

module.exports = messsageRouter;
