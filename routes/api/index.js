// Set requirements (Express Router)
const router = require('express').Router();

// Set routes (user and Thought routes)
const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// Add `/users` to created routes 
router.use('/users', usersRoutes);

// Add `/Thoughts` to created routes 
router.use('thoughts', thoughtsRoutes);

// Export Module Router
module.exports = router;