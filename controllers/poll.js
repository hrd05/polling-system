
const Poll = require('../models/poll');
const User = require('../models/user');

exports.createPoll = async (req, res) => {
    const { question, options } = req.body;

    try {
        const poll = await Poll.create({ question: question, options: options, createdBy: req.user._id });
        console.log(poll);
        await User.findByIdAndUpdate(req.user._id, { $push: { createdPolls: poll._id } });
        res.status(201).json(poll);
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
}

exports.votePoll = async (req, res) => {

    const { pollId, optionId } = req.params;
    const userId = req.user._id;
    try {

        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        if (req.user.votedPolls.includes(pollId)) {
            return res.status(400).json({ message: 'you have already voted for this poll' });
        }

        const option = poll.options.find((opt) => opt.id === optionId);

        if (!option) {
            return res.status(404).json({ message: 'Option not found' });
        }


        option.votes.push(userId);
        option.voteCount += 1;
        await User.findByIdAndUpdate(userId, { $push: { votedPolls: poll._id } });
        await poll.save();

        res.status(200).json({ message: 'Vote cast successfully', poll });
    }
    catch (err) {
        console.log(err);
    }
}

