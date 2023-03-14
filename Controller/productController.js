const asyncHandler = require("express-async-handler");
const productSchema = require("../Model/productModel");
const getProducts = async (req, res) => {
  const products = await productSchema.find();
  return res.status(200).json({
    message: "all products fetched successfully",
    status: res.statusCode,
    data: products,
  });
};
const getProduct = async (req, res) => {
  console.log(req.params.id);
  const singleProduct = await productSchema.findOne({ _id: req.params.id });

  if (singleProduct === null) {
    console.log("i am being called");
    return res.status(412).json({
      message: "Product of that id is not available.",
      status: res.statusCode,
    });
  }
  console.log("i am 2nd called");
  res.status(200).json({
    message: "Data fetched successfully",
    status: res.statusCode,
    data: singleProduct,
  });
};
const createProduct = asyncHandler(async (req, res) => {
  const { _id, productName, price, brand, description } = req.body;
  const productChecker = await productSchema.findOne({ _id: _id });
  const product = await productSchema.create({ ...req.body });
  console.log(productChecker);
  if (product !== null) {
    res
      .status(400)
      .json({ message: "Product of this id has been already created" });
  }
  res.status(200).json({ message: "Product created successfully" });
});
const updateProduct = async (req, res) => {
  const updateProduct = await productSchema.findByIdAndUpdate(req.params.id, { ...req.body });
  if (!updateProduct) {
    return res.status(404).json({
      message: "Product of that id has not found.",
    });
  }
  const productInfo = await productSchema.findOne({_id:req.params.id});
  console.log("product info : ",productInfo)
  res.status(200).json({
    message: "Product has been updated successfully",
    status: res.statusCode,
    data: {
      productInfo,
    },
  });
};
const deleteProduct = async (req, res) => {
  
  const findProduct = await productSchema.findOne({_id:req.params.id});
  if(!findProduct){
    return res.status(404).json({
      message:"Provided id was not found.",
      status:res.statusCode
    })
  }
  else{
    const deleteProduct = await productSchema.deleteOne({_id:req.params.id});
    return res.status(200).json({
      message:"Product has been deleted successfully",
      status:res.statusCode,
      data:deleteProduct
    })
  }
  res.send("delete products");
};
module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
