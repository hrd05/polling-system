const router = require('express').Router();

const userController = require('../controllers/user');
const multerMiddleware = require('../middleware/multer');
const authMiddleware = require('../middleware/auth');
const upload = multerMiddleware.multer.single('profilePicture');


router.post('/register', upload, userController.registerUser);

router.post('/login', userController.loginUser);




module.exports = router;    