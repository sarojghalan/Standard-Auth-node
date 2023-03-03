const mongoose = require('mongoose');   
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName:{
        type:'string'
    },
    password:{
        type:'string',
    }
});

module.exports = mongoose.model('User',UserSchema) ;