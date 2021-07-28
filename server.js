// Express and mongoose requirements
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// Configure Mongoose
mongoose.connect("mongodb://localhost/socialmedia", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});