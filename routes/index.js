// For Express router
const router = require('express').Router();

// Import all routes 
const apiRoutes = require('./api');

// Prefix for API
router.use('/api', apiRoutes);

// 404 Status error message
router.use((req, res) => {
    res.status(404).send('<h1>404 Error....</h1>');
  });

// // Module exports router
module.exports = router;