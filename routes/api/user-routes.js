// Require express router
const router = require('express').Router();

// Set requirements (from users-controller)
const {
    getUsers,
  } = require('../../controllers/users-controller');

// User by Id
const {
      getUsersById,
  } = require('../../controllers/users-controller');

// Create Users
  const {
      createUsers,
  } = require('../../controllers/users-controller');

// Update Users
const {
      updateUsers,
  } = require('../../controllers/users-controller');

// Delete Users
const {
  deleteUsers,
} = require('../../controllers/users-controller');

// Add Friend
const {
      addFriend,
  } = require('../../controllers/users-controller');

// Delete Friend
const {
      deleteFriend,
  } = require('../../controllers/users-controller');

//Get and Create Users
router.route('/').get(getUsers).post(createUsers);

// Get USer by ID Update user and delete user
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router; 
