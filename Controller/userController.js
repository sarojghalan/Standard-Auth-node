const asyncHandler = require("express-async-handler");
const userModel = require("../Model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
      // Store the OTP in the session
      // const user = await userModel.create({ ...req.body });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          const user = userModel.create({
            userName:userName,
            email:email,
            phone:phone,
            password:hashPassword,
            isVerified: false,
            otpCode: otp,
          });
          res.status(200).json({
            message: "OTP has been sent to your email.",
            ...req.app.locals,
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
  const user = await userModel.findOne({ email: email });
  console.log( user.otpCode);
  console.log( otp);
  try {
    if (!email || !otp) {
      res.status(412).json({
        message: "empty field detected",
        status: res.statusCode,
      });
    } else if (user.otpCode !== otp) {
      res.status(412).json({
        message: "Enter OTP code didn't match",
        status: res.statusCode,
      });
    } else {
      await userModel
        .findOneAndUpdate({ email: email }, { isVerified: true })
      res.status(200).json({
        message: "you have been verified successfully",
        status: res.statusCode,
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
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(412).send({
          message: "Incorrect Password.",
          status: res.statusCode,
          ...req.body,
        });
      }
    }
    if (user?.isVerified) {
      const token = jwt.sign({ email }, "secret-key", { expiresIn: "30d" });
      console.log(token);
      res.status(200).send({
        message: "You have been successfully Logged In.",
        status: res.statusCode,
        ...req.body,
        token,
      });
    }
    if(!user?.isVerified) {
      res.status(401).send({
        message: "You are not verified yet. Please Sign Up",
        status: res.statusCode,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });
  const otp = Math.floor(100000 + Math.random() * 900000);
  if (!email) {
    res.status(412).json({
      message: "Please enter your email !.",
      status: res.statusCode,
    });
  } else if (user === null) {
    res.status(401).json({
      message: "Your provided email has not been registered yet.",
      status: res.statusCode,
    });
  } else {
    const mailOptions = {
      from: "codewithsaroj@gmail.com",
      to: `${email}`,
      subject: "TOken for Reset verify forgot password",
      text: `Your OTP code is ${otp}.`,
    };
    //storing otp in overall application using app.locals
    req.app.locals = {
      otp: otp,
      registerData: {
        ...req.body,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          message: "TOken has been sent to your email.",
          ...req.session.otp,
        });
      }
    });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, password, confirm_password } = req.body;
  console.log("server otp is : ", typeof req.app.locals.otp)
  console.log("user otp is : ", typeof otp)
  const query = { email: email };
  try {
    if (!otp) {
      res.status(412).json({
        message: "OTP field is empty !",
      });
    }
    if (password !== confirm_password) {
      res.status(412).json({
        message: "Password and confirm password didn't match please check !",
      });
    }
    if (req.app.locals.otp != otp) {
      res.status(412).json({
        message: "Given OTP didn't match",
      });
    } else {
      const user = await userModel.findOneAndUpdate(
        query,
        { password: password}
      );
      res.status(200).json({
        message:
          "Your OTP has been verified successfully. Now you reset password",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
