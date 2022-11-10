const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const authenticationRouter = require("./routes/authentication");
const messsageRouter = require("./routes/message");
const dotenv = require("dotenv");

const app = express(); 

dotenv.config(); // These is to take env value from .env file
app.use(cors()); //For performing cross origin transfer Check online for ideas on these.
app.use(bodyParser.json());  //Parsing request and response to json for idea google it out.


app.get("/", (req, res) => {
  res.send("/");
});

app.use("/auth", authenticationRouter); //all router provided by backend for authentiction.

app.use("/message", messsageRouter);   //all router provided by backend for mail services like inbox,sent,all kind of functionality.



//here We are getting connected to our database
//process.env.MONGOOSE_DATABASE_URL this value is present in .env file just check it out that is the url of our database 
//currently mine is local further we gonna take a mongo online cluster and make it online ok.
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
