require("dotenv").config();
const express = require("express");
const cors = require('cors');
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const connectDb = require("./Database/connectDb");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo")
const errorHandler = require("./Middleware/errorHandler");


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `${process.env.MONGODB_URL}`
    }),
    cookie: { maxAge: 86400000},
  })
);
app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

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
