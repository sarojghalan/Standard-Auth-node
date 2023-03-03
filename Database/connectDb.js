const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error("Error connecting to database:", error));
};

module.exports = connectDb;