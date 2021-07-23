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

// } = require('../../controllers/thoughts-controller');

// Delete Thought
const {deleteThought, 
    
} = require('../../controllers/thoughts-controller');

// Add Reaction
const {addReaction, 
    
} = require('../../controllers/thoughts-controller');

// Delete Reaction
const {deleteReaction, 
    
} = require('../../controllers/thoughts-controller');



// -- Directs to: /api/Thought-routes <GET>
router.route('/').get(getThought).post(createThought);

// -- Directs to: /api/Thought-routes/:id <GET, PUT, DELETE>
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought); 


// -- Directs to: /api/Thought-routes/:ThoughtId/reactions <POST>
router.route('/:ThoughtId/reactions').post(addReaction);

// -- Directs to: /api/Thought-routes/:ThoughtId/reactionId <DELETE>
router.route('/:ThoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;