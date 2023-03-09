const {constants} = require('../constants')
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case constants.VALIDATION_ERR:
            res.json({
                title:"Validation Failed",
                message:err.message
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found!",
                message:err.message
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title:"You are not allowed !",
                message:err.message
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title:"It seems like you are not authorized !",
                message:err.message
            })
            break;
        default:
            break;
    }
}   
module.exports = errorHandler;