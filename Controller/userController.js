const userModel = require("../Model/userModel");
const getUser = (req, res) => {
  res.status(200).json({
    name: "hah",
  });
};

const createUser = async (req, res) => {
  try {
    const user = await userModel.create({ ...req.body });
    res.status(200).send("ok");
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body.userName);
    const user = await userModel.findOne({ userName: req.body.userName });
    if (req.body.password === user.password) {
      res.status(200).send("Login Bhaes  !");
    } else {
      res.status(200).send("Tah Ko Ho  !");
    }
    console.log(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUser, createUser, loginUser };
