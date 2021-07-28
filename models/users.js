const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
           type: String,
           unique: true,
           required: true,
           trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // use REGEX to validate correct email
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
            
        },
        Thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'

        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users'

        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,

        },
        id: false
    }
)

//get number of friends
usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the users model using the users schema
const users = model('users', usersSchema);

module.exports = users;
