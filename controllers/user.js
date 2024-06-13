
const User = require('../models/user');
const { uploadToS3 } = require('../services/s3Services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    const { email, password, username } = req.body;
    const profilePicture = req.file;
    try {

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json('email already exists');
        }

        const filename = `${profilePicture.originalname}/${Date.now()}`;
        const profileUrl = await uploadToS3(profilePicture.buffer, filename);
        console.log(profileUrl);
        const hash = await bcrypt.hash(password, 10);
        if (hash) {
            await User.create({ username: username, email: email, password: hash, profilePicture: profileUrl });
            res.status(201).json('user created successfully');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json('error creating user');
    }
}

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, process.env.JWT_TOKEN);
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return res.status(201).json({ message: 'User logged in Successfully', token: generateAccessToken(user._id.toString()) });
        }
        else {
            return res.status(401).json({ message: 'incorrect password' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }

}