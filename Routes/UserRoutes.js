const express = require('express');
const router = express.Router();
const {getUser ,createUser,loginUser} = require('../Controller/userController')

router.route('/').get(getUser).post(createUser);
router.route('/login').post(loginUser)

module.exports = router;