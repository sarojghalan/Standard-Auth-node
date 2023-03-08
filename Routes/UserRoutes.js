const express = require('express');
const router = express.Router();
const { registerUser,loginUser,verifyOtp} = require('../Controller/userController')

router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/verify-otp').post(verifyOtp);

module.exports = router;