require("dotenv").config();
const express = require("express");
const userRoutes = require("./Routes/UserRoutes");
const connectDb = require("./Database/connectDb");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key", // a secret key used to sign the session ID cookie
    resave: true, // do not save the session if it was not modified
    saveUninitialized: false, // do not save uninitialized sessions
    cookie: {
      maxAge: 3600000, // set the maximum age of the session to 1 hour (3600000 milliseconds)
    },
  })
);

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
