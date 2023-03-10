const asyncHandler = require("express-async-handler");
const userModel = require("../Model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// const session = require('express-session')

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "587",
  auth: {
    user: "codewithsaroj@gmail.com",
    pass: "ijjcsivjbpyjwbwz",
  },
  secureConnection: "false",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

const registerUser = async (req, res, next) => {
  const { userName, email, phone, password, confirm_password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const user = await userModel.findOne({ email: email });
  try {
    if (!userName || !email || !phone || !password || !confirm_password) {
      res.status(400).json({
        message: "All fields are mandatory !",
        status: res.statusCode,
      });
    } else if (password !== confirm_password) {
      res.status(412).json({
        message: "Given Password did not match",
        status: response.statusCode,
      });
    } else if (user !== null) {
      if (user.email === email) {
        res.status(412).json({
          message:
            "You have already register from this email. Please try another",
        });
      }
    } else {
      const mailOptions = {
        from: "codewithsaroj@gmail.com",
        to: `${email}`,
        subject: "OTP Code for Registration",
        text: `Your OTP code is ${otp}.`,
      };
      req.app.locals = {
        otp: otp,
        registerData: {
          ...req.body,
        },
      };
      // Store the OTP in the session
      // const user = await userModel.create({ ...req.body });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({
            message: "OTP has been sent to your email.",
            ...req.session.otp,
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  // console.log("user otp is : ", otp)
  try {
    if (req.app.locals.otp == otp) {
      const user = await userModel.create({ ...req.app.locals.registerData });
      res.status(200).json({
        message: "Your OTP has been verified successfully. Now you can login",
      });
    } else {
      res.status(412).json({
        message: "Given OTP didn't match",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.findOne({ email: email });
    if (!email || !password) {
      res.status(400).json({
        message: "Empty Field Detected !",
        status: res.statusCode,
      });
    }
    if (user === null) {
      res.status(412).send({
        message: "Incorrect Email.",
        status: res.statusCode,
        ...req.body,
      });
    }
    if (user !== null) {
      if (user?.password !== password) {
        res.status(412).send({
          message: "Incorrect Password.",
          status: res.statusCode,
          ...req.body,
        });
      }
    }
    console.log(" i am being called or not .");
    const token = jwt.sign({ email }, "secret-key", { expiresIn: "30d" });
    console.log(token);
    res.status(200).send({
      message: "You have been successfully Logged In.",
      status: res.statusCode,
      ...req.body,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser, verifyOtp };
