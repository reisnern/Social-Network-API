// Express and mongoose requirements
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(require('./routes'));

// Configure Mongoose
mongoose.connect("mongodb://localhost/socialmedia", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connect to mongoose
mongoose.connection.on('Mongo On', () =>
    console.log('Connected to MongoDB')
);

mongoose.connection.on('error', (err) =>
    console.log(redText, `Error Mongoose not connected': ${err}`)
);

// Log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});