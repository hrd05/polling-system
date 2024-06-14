Introduction
This is a real-time polling application built with Node js, Express js and MongoDB. The application allows users to create polls, vote on them, and view results. It also includes user authentication and a commenting feature for polls.

Features
Create Polls: Users can create new polls with multiple options.
Vote on Polls: Users can vote on existing polls.
Real-Time Updates: Poll results update in real-time using Socket.IO.
Commenting: Users can comment on polls and reply to comments.
User Authentication: Only authenticated users can create polls and vote.
User Profiles: Users can view their profile, including created polls and votes.

Technologies Used

Backend: Node.js, Express.js
Database: MongoDB, Mongoose for ODM
Real-Time Communication: Socket.IO
Authentication: JWT (JSON Web Tokens)

Installation and Setup
Clone the Repository
git clone https://github.com/yourusername/polling-app.git

Environment Variables
Create a .env file in the root directory and add the following:
//find the details on mail

Install Dependencies
npm install

Running the Application
Start the Backend
npm start

API Documentation
User Endpoints
Register User: POST /register
Login User: POST /login  
// by logging in userprofile details are send so not creating other route

Poll Endpoints
Create Poll: POST /poll/create-poll
Vote on Poll: POST /poll/vote-poll/:pollId/:optionId

Comment Endpoints
Add Comment: POST /add-comment/:pollId
Add Reply: POST /add-reply/:commentId
Get Comments: GET /comments/:pollId
