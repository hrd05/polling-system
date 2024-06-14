// controllers/poll.js
const Poll = require('../models/poll');
const User = require('../models/user');

module.exports.createPoll = async (req, res) => {
    const { question, options } = req.body;

    try {
        const poll = await Poll.create({ question, options, createdBy: req.user._id });
        await User.findByIdAndUpdate(req.user._id, { $push: { createdPolls: poll._id } });
        res.status(201).json(poll);
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
};

module.exports.votePoll = (io) => async (req, res) => {
    const { pollId, optionId } = req.params;
    const userId = req.user._id;

    try {
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (req.user.votedPolls.includes(pollId)) {
            return res.status(400).json({ message: 'You have already voted for this poll' });
        }

        const option = poll.options.find((opt) => opt.id === optionId);

        if (!option) {
            return res.status(404).json({ message: 'Option not found' });
        }

        option.votes.push(userId);
        option.voteCount += 1;
        await User.findByIdAndUpdate(userId, { $push: { votedPolls: poll._id } });
        await poll.save();

        io.emit('vote', poll); // Emitting the vote event to all clients

        res.status(200).json({ message: 'Vote cast successfully', poll });
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
};

module.exports.getPollResults = async (req, res) => {
    const { pollId } = req.params;
    console.log(pollId);

    try {
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ message: 'poll not found' });
        }
        // console.log(poll);

        const results = {
            _id: poll._id,
            question: poll.question,
            options: poll.options.map(option => ({
                id: option.id,
                text: option.text,
                voteCount: option.voteCount
            })),
            totalVotes: poll.options.reduce((total, option) => total + option.voteCount, 0)
        }

        res.status(200).json(results);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting results" });
    }
}