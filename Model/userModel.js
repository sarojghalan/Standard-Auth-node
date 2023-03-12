const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({ 
  userName: {
    type: "string",
    required:[true,"username filed is required"]
  },
  email: {
    type: "string",
    required:[true,"email filed is required"]
  },
  phone: {
    type: "number",
    required:[true,"phone filed is required"]
  },
  password: {
    type: "string",
    required:[true,"password filed is required"]
  },
  otpCode:{
    type:'string',
    required:[false]
  },
  isVerified:{
    type:'boolean',
    default:false
  }
});

module.exports = mongoose.model("User", UserSchema);
