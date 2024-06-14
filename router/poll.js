const router = require('express').Router();

const pollController = require('../controllers/poll');
const authMiddleware = require('../middleware/auth');


module.exports = function (io) {
    router.post('/poll/create-poll', authMiddleware.authenticate, pollController.createPoll);
    router.post('/poll/vote-poll/:pollId/:optionId', authMiddleware.authenticate, pollController.votePoll(io)); // Pass io instance to votePoll
    router.get('/poll/:pollId/results', pollController.getPollResults);
    return router;
};