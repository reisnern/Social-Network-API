// require express router
const router = require('express').Router();

// Get Thoughts
const {getThought, 
    
} = require('../../controllers/thoughts-controller');

// Get Thought by ID
const {getThoughtById,
    
} = require('../../controllers/thoughts-controller');

// Create Thought
const {createThought, 
    
} = require('../../controllers/thoughts-controller');

// Update Thought
const {updateThought, 

} = require('../../controllers/thoughts-controller');

// Delete Thought
const {deleteThought, 
    
} = require('../../controllers/thoughts-controller');

// Add Reaction
const {addReaction, 
    
} = require('../../controllers/thoughts-controller');

// Delete Reaction
const {deleteReaction, 
    
} = require('../../controllers/thoughts-controller');


// Get all thoughts, Create Thought
router.route('/').get(getThought).post(createThought);

// Get thought by id, update thought, delete thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought); 

// Add Reaction
router.route('/:ThoughtId/reactions').post(addReaction);

// Delete Reaction
router.route('/:ThoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;