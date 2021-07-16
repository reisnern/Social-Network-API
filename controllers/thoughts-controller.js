// Require Models
const {thoughts, users} = require('../models');

// Set up  Controller
const thoughtsfunctions = {

    // Create a new thought
    createthoughts({params, body}, res) {
        thoughts.create(body)
        .then(({_id}) => {
            return users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
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

    // Get all available thoughts
    getAllthoughts(req,res) {
        thoughts.find({})
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
  getthoughtsById({params}, res) {
    thoughts.findOne({ _id: params.id })
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
deletethoughts({params}, res) {
    thoughts.findOneAndDelete({_id: params.id})
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
    thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
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
    thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
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
module.exports = thoughtsfunctions;