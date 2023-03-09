const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: "string",
    required:[true,"productName filed is required"]
  },
  price: {
    type: "number",
    required:[true,"price filed is required"]
  },
  description: {
    type: "string",
    required:[true,"description filed is required"]
  },
  brand: {
    type: "string",
    required:[true,"brand filed is required"]
  },
});

module.exports = mongoose.model("Product", ProductSchema);
