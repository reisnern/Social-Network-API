// Require Models
const {Thoughts, Users} = require('../models');

// Set up  Controller
const thoughts = {

    // Create a new thought
    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)); 
    },

    // Get all available Thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

  // Get thought by ID
  getThoughtsById({params}, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({path: 'reactions',select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
        if(!dbThoughtData) {
        res.status(404).json({message: 'No thoughts exist with this ID!'});
        return;
    }
    res.json(dbThoughtData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},

// Delete thought by ID
deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts exist with this ID!'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
},

// Add new Reaction
addReaction({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
    if (!dbThoughtData) {
        res.status(404).json({message: 'No thoughts exist with this ID!'});
        return;
    }
    res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))

},

// Delete reaction by ID
deleteReaction({params}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts exist with this ID!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
}

};

// Export module 
module.exports = thoughts.js;