const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.signUp = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phonenumber = req.body.phonenumber;

  bcrypt
    .hash(password, 12)
    .then((hash) => {
      const user = new User({
        username: username,
        email: email,
        password: hash,
        phonenumber: phonenumber,
      });
      return user.save();
    })
    .then((user) => {
      const token = jwt.sign(
        {
          email: email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        message: "Signup Successful",
        user: user,
        token:token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log();
  User.find({ email: email })
    .then((user) => {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id.toString(),
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(202).json({
            message: "Logging in",
            token: token,
            userId: user[0]._id.toString(),
            email: user[0].email
          });
        } else {
          res.status(401).json({
            message: "Password is incorrect",
          });
        }
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Email not found",
      });
    });
};
