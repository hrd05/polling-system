const Comment = require('../models/comment');
// const Poll = require('../models/poll');
// const User = require('../models/user');

exports.addComment = async (req, res) => {
    const { pollId } = req.params;
    const { text } = req.body;
    try {
        const comment = await Comment.create({ poll: pollId, text: text, user: req.user._id });
        res.status(201).json({ message: 'Comment added', comment: comment });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error adding comment' });
    }
}

exports.addReply = async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;
    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.replies.push({ text: text, user: req.user._id, createdAt: new Date() });
        await comment.save();

        res.status(201).json({ message: 'Reply added', comment: comment });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error adding reply' });
    }
}

exports.getCommentsofPoll = async (req, res) => {
    const { pollId } = req.params;
    try {
        const comments = await Comment.find({ poll: pollId }).populate('user', ['username', 'profilePicture']).populate('replies.user', ['username', 'profilePicture']);

        res.status(200).json({ comments: comments });
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Error fetching comments');
    }
}