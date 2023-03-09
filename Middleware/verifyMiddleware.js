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
const verifyMiddleware = async (req, res, next) => {
  console.log("middleware : ", req.body);
  const { userName, email, phone, password, confirm_password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  // console.log(userModel.findOne({ email: email }) ? "haha" : "no haha");
  try {
    if (!userName || !email || !phone || !password || !confirm_password) {
      res.status(400).json({
        message:"All filed are mandatory !"
      })
    } else if (password !== confirm_password) {
      res.status(412).json({
        message: "Given Password did not match",
      });
    } else if (userModel.findOne({ email: email })) {
      res.status(412).json({
        message:
          "You have already register from this email. Please try another",
      });
    } else {
      const mailOptions = {
        from: "codewithsaroj@gmail.com",
        to: `${email}`,
        subject: "OTP Code for Registration",
        text: `Your OTP code is ${otp}.`,
      };
      req.app.locals.otp = otp; // Store the OTP in the session
      //   const user = await userModel.create({ ...req.body });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          next();
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyMiddleware;
