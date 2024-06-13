const { Schema, model, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createdPolls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
    votedPolls: [{ type: Schema.Types.ObjectId, ref: 'Poll' }],
})

module.exports = mongoose.model('User', userSchema);