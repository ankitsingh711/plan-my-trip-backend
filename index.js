const express = require("express");
const app = express();
const { connection } = require("./config/db");
require("dotenv").config();
const { TravelRouter } = require("./router/TravelRouter");
const cors = require("cors");

let port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", TravelRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("DB Connected");
    console.log(`App is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
