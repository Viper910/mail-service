const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const authenticationRouter = require("./routes/authentication");
const messsageRouter = require("./routes/message");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors()); //For performing cross origin transfer
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("/");
});

app.use("/auth", authenticationRouter);
app.use("/message", messsageRouter);

mongoose
  .connect(process.env.MONGOOSE_DATABASE_URL)
  .then((result) => {
    app.listen("3000", () => {
      console.log("check http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
