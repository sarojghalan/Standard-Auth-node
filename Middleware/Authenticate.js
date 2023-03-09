const jwt = require('jsonwebtoken');
const Authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({
            message:"You are not authorized !"
        })
    }
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token,'secret-key');
    const {email} = decode;
    req.user = {email};
    next();
}
module.exports =  Authenticate;