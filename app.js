const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");

//router
const userSignUp = require("./userSignUp/userSignUp.router");

app.use(express.json()); //Parsing Incoming JSON Data:
app.use((req, res, next) => {
  //Middleware for Request Logging and Timing:
  req.requestTime = new Date().toString();
  console.log({ reqTime: req.requestTime, reqHeader: req.headers });

  next();
});

//MiddleWare
app.use("/userSignUp", userSignUp);

dotEnv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("DB_CONNECTED!!!");
  })
  .catch((err) => {
    // console.error("MongoDB connection error:", err.message);
    if (
      err.message ==
      "querySrv ECONNREFUSED _mongodb._tcp.cluster0.b9jwp.mongodb.net"
    )
      console.log("CHECK YOUR NETWORK CONNECTION");
    else console.log("MongoDB Error".err.message);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Started & PORT ${port} `);
});
