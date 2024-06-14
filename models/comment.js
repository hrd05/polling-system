const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    replies: [{
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
    }]

}, { timestamps: true })

module.exports = model('Comment', commentSchema);