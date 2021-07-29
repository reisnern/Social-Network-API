// Require Models
const {users, thoughts} = require('../models');

// Set up Controller
const Thoughtsfunctions = {

    //create thought
    createThought({ params, body }, res) {
        thoughts.create(body)
        .then(({ _id }) => {
            return users.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // Get Thoughts
    getThought(req,res) {
        thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

  // Get Thought by ID
  getThoughtById({params}, res) {
    thoughts.findOne({ _id: params.thought.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));    
    },

// Delete Thought by ID
deleteThought({params}, res) {
    thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No Thoughts found with this ID!'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
},

// Add new Reaction
addReaction({params, body}, res) {
    thoughts.findOneAndUpdate({_id: params.ThoughtId}, {$push: {reactions: body}}, {new: true})
    .then(dbThoughtData => {
    if (!dbThoughtData) {
        res.status(404).json({message: 'No Thoughts exist with this ID!'});
        return;
    }
    res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))

},

// Delete reaction by ID
deleteReaction({params}, res) {
    thoughts.findOneAndUpdate({_id: params.ThoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.status(400).json(err));
}

};

// Export module 
module.exports = Thoughtsfunctions;