const { mongo, default: mongoose } = require("mongoose");
const Message = require("../models/message");
const User = require("../models/user");

exports.fetchInbox = (req, res) => {
  const userId = mongo.ObjectId(req.userId);
  User.findById(userId)
    .populate("inbox.msgId")
    .then((user) => {
      res.status(200).json({
        message: "Inbox fetched",
        inbox: user.inbox,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Server is Down,Sry for Inconvinence",
      });
    });
};

exports.fetchSentmessage = (req, res) => {
  const userId = mongo.ObjectId(req.userId);
  User.findById(userId)
    .populate("sent.msgId")
    .then((user) => {
      res.status(200).json({
        message: "Sent messages fetched",
        sent: user.sent,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server is Down,Sry for Inconvinence",
      });
    });
};

exports.postSendMessage = (req, res) => {
  const userId = mongo.ObjectId(req.userId);

  const from = req.body.from;
  const to = req.body.to;
  const subject = req.body.subject;
  const message = req.body.message;
  let fromUser;
  let toUser;
  User.findById(userId)
    .then((user) => {
      fromUser = user;
      return User.find({ email: to });
    })
    .then((touser) => {
      toUser = touser[0];
      const sendmessage = new Message({
        from: from,
        to: to,
        subject: subject,
        message: message,
      });
      return sendmessage.save();
    })
    .then((messageDetail) => {
      const msgid = messageDetail._id;
      fromUser.sent.push({ msgId: msgid });
      toUser.inbox.push({ msgId: msgid });
      fromUser.save();
      toUser.save();
      res.status(200).json({
        message: "Email sent successfully",
        from: fromUser,
        to: toUser,
        detail: messageDetail,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to Sent Email",
      });
    });
};

exports.deleteInboxById = (req, res) => {
  const msgid = req.params.id;
  const userId = mongo.ObjectId(req.userId);
  
  User.findOneAndUpdate({ _id: userId }, { $pull: { inbox: { msgId: msgid } } })
    .then((user) => {
      res.status(202).json({
        message: `${msgid} succefully deleted`,
        inbox: user.inbox,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Server is Down,Sry for Inconvinence",
      });
    });
};

exports.deleteSentbyId = (req, res) => {
  const msgid = req.params.id;
  console.log(msgid);
  const userId = mongo.ObjectId(req.userId);
  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { sent: { msgId: mongo.ObjectId(msgid) } } }
  )
    .then((user) => {
      res.status(202).json({
        message: `${msgid} succefully deleted`,
        sent: user.sent,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Invalid id",
      });
    });
};
