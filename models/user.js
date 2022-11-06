const { default: mongoose, Mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phonenumber: {
    type: String,
    require: true,
  },
  inbox: [
    {
      msgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
      },
    },
  ],
  sent: [
    {
      msgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
      },
    },
  ],
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
