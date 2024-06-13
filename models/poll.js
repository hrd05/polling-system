const { Schema, model } = require('mongoose');

const pollSchema = new Schema({
    question: { type: String, required: true },
    options: [{
        id: { type: String, required: true, unique: true },
        text: { type: String, required: true, unique: true },
        votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        voteCount: { type: Number, default: 0 }
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Poll', pollSchema);