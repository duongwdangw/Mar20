const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email : String,
    name : String,
    dateOfBirth : String,
    address : String,
    nationality : String,
    pass : String 
})


const User = mongoose.model('User', userSchema);

module.exports = {
    userSchema,
    User
}