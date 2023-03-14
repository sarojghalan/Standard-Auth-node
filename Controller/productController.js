const asyncHandler = require("express-async-handler");
const productSchema = require("../Model/productModel");
const getProducts = async (req, res) => {
  const products = await productSchema.find();
  res.status(200).json({
    message:"all products fetched successfully",
    status:res.statusCode,
    data:products
  });
};
const getProduct = asyncHandler( async (req, res) => {
  console.log(req.params.id);
  const singleProduct = await productSchema.findOne({_id:req.params.id})
  if(singleProduct === null){
    res.status(412).json({
      message:"Product of that id is not available.",
      status:res.statusCode
    })
  }
  res.status(200).json({
    message:"Data fetched successfully",
    status:res.statusCode,
    data:singleProduct
  })
});
const createProduct = asyncHandler(async (req, res) => {
  const {_id, productName, price, brand, description } = req.body;
  const productChecker = await productSchema.findOne({_id:_id})
  const product = await productSchema.create({ ...req.body });
  console.log(productChecker);
  if(product !== null){
    res.status(400).json({ message: "Product of this id has been already created" });
  }
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
