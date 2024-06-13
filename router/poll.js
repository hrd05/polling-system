const router = require('express').Router();

const pollController = require('../controllers/poll');
const authMiddleware = require('../middleware/auth');


router.post('/create-poll', authMiddleware.authenticate, pollController.createPoll);

router.post('/vote-poll/:pollId/:optionId', authMiddleware.authenticate, pollController.votePoll);


module.exports = router;