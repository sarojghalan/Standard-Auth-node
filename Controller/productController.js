const asyncHandler = require("express-async-handler");
const productSchema = require("../Model/productModel");
const getProducts = async (req, res) => {
  const products = await productSchema.find();
  res.send(products);
};
const getProduct = asyncHandler((req, res) => {
  console.log(req.body);
  const { productName, price, brand, description } = req.body;
});
const createProduct = asyncHandler(async (req, res) => {
  const { productName, price, brand, description } = req.body;
  const product = await productSchema.create({ ...req.body });
  res.status(200).json({ message: "Product created successfully" });
});
const updateProduct = (req, res) => {
  res.send("update products");
};
const deleteProduct = (req, res) => {
  res.send("delete products");
};
module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
