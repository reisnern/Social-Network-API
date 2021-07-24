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

// Add Friend
const {
      addFriend,
  } = require('../../controllers/users-controller');

// Delete Friend
const {
      deleteFriend,
  } = require('../../controllers/users-controller');

            c
// -- Directs to: /api/users <GET, POST>
router.route('/').get(getUsers).post(createUsers);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// Module export router
module.exports = router; 
