
const router = require('express').Router();

const authMiddleware = require('../middleware/auth');
const commentController = require('../controllers/comment');

router.post('/add-comment/:pollId', authMiddleware.authenticate, commentController.addComment);

router.post('/add-reply/:commentId', authMiddleware.authenticate, commentController.addReply);

router.get('/comments/:pollId', commentController.getCommentsofPoll);

module.exports = router;