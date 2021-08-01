// Require Models
const {thoughts} = require('../models');

// Set up Controller
const Thoughtsfunctions = {

    //create thought
    createThought({body}, res) {
        thoughts.create(body)
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
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
    const myID = params.id.slice(1)  
    thoughts.findOne({ _id: myID })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));    
    },

// Update Thought by ID
updateThought({params, body}, res) {
    thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({message: 'No Thoughts found with this ID!'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err))
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