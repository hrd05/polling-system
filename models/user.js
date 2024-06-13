const { Schema, model, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);