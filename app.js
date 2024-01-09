const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");

dotEnv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("DB_CONNECTED!!!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Started & PORT ${port} `);
});
