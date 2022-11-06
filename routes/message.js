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

messsageRouter.get("/inbox", isAuth, fetchInbox);

messsageRouter.delete("/inbox/:id", isAuth, deleteInboxById);

messsageRouter.delete("/sent/:id", isAuth, deleteSentbyId);

messsageRouter.get("/sent", isAuth, fetchSentmessage);

messsageRouter.post("/sendmessage", isAuth, postSendMessage);

module.exports = messsageRouter;
