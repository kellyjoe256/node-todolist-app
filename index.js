const cors = require('cors');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Task routes
const taskRoutes = require('./routes/task.routes');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// morgan
app.use(morgan('tiny'));

// enable CORS
app.use(cors());

mongoose.Promise = global.Promise;

// Connecting to the database
const dbURI = config.has('mongo.uri')
    ? config.get('mongo.uri')
    : 'mongodb://localhost:27017/todoapp';

mongoose
    .connect(dbURI, config.get('mongo.options'))
    .then(() => {
        console.log('Successfully connected to the database...');
    })
    .catch((err) => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// Apply task routes
app.use('/api/tasks', taskRoutes);

// define entry route
app.get('/', (req, res) => {
    const response = {
        message: 'Welcome to my simple todolist application...',
    };

    res.json(response);
});

const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
