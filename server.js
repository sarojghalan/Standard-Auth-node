require("dotenv").config();
const express = require("express");
const userRoutes = require("./Routes/UserRoutes");
const connectDb = require("./Database/connectDb");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/api/v1/user", userRoutes);

const startServer = async () => {
  try {
    await connectDb(process.env.MONGODB_URL);
    app.listen(process.env.PORT || 5000, () => {
      console.log("listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};
startServer();
