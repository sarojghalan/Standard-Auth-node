const userModel = require("../Model/userModel");
const nodemailer = require("nodemailer");

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

const registerUser = async (req, res,next) => {
  const { userName, email, phone, password, confirm_password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    if (!userName || !email || !phone || !password || !confirm_password) {
      res.status(412).json({
        message: "Empty Field Detected",
      });
    } else if (password !== confirm_password) {
      res.status(412).json({
        message: "Given Password did not match",
      });
    } else {
      const mailOptions = {
        from: "codewithsaroj@gmail.com",
        to: `${email}`,
        subject: "OTP Code for Registration",
        text: `Your OTP code is ${otp}.`,
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          req.userOtp = {
            otp: otp
          }
          console.log(req.userOtp)
          next()
          // res.status(200).json({
          //   message: "OTP has been sent to your email.",
          // });
        }
      });
      
    }
    // const user = await userModel.create({ ...req.body });
  } catch (err) {
    console.log(err);
  }
};

const verifyOtp = async (req,res) => {
  console.log(req.userOtp);
  res.send("ok");
}

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

module.exports = { registerUser, loginUser ,verifyOtp};
