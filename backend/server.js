//import
//cors: cross origin resource sharing, allowed ajax request access resource from remote host.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//dotenv: load environment variables form a .env file
require('dotenv').config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
//allow us to parse json
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// require the files, load file from routes.
const filecontentRouter = require('./routes/filecontent');

// use the files. url
app.use('/filecontent', filecontentRouter);

// start the server use nodemon server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});