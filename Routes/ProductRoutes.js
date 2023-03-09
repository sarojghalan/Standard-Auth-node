const express = require('express');
const router = express.Router();
const {getProduct,getProducts,createProduct,updateProduct,deleteProduct} = require('../Controller/productController')

router.get('/getProducts',getProducts);
router.get('/getProduct/:id',getProduct);
router.post('/createProduct',createProduct);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);

module.exports = router;