// Require express and mongoose
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(require('./routes'));

// Connect mongoose
mongoose.connect(MONGODB_ENDPOINT, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// listen for connection or error events
mongoose.connection.on('connected', () =>
    console.log('Connected to MongoDB Endpoint')
);

mongoose.connection.on('error', (err) =>
    console.log(redText, `Mongoose default connection error: ${err}`)
);

// Log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});