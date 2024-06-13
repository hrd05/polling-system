const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./router/user');
const pollRoutes = require('./router/poll');

const app = express();
const server = http.createServer(app);


// const io = new Server(server);

// io.on('connection', (socket) => {
//     // console.log('a user connected');
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(pollRoutes);

// app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })


mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('db connected');
        server.listen(3000);
    })
    .catch(err => console.log(err));

