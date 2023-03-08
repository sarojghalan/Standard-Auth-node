const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: {
    type: "string",
  },
  email: {
    type: "string",
  },
  phone: {
    type: "number",
  },
  password: {
    type: "string",
  },
  confirm_password: {
    type: "string",
  },
});

module.exports = mongoose.model("User", UserSchema);
