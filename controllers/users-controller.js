// Require users Model
const {users} = require('../models');

// Set up Controller
const usersController = {
    
    // Create new User
    createUsers({body}, res) {
        users.create(body)
        .then((dbUserData) => {
            res.json(dbUserData)
        })
        .catch ((err) => {
            console.log(err);
            res.status(500).json()
        });
    
    },

    //Get all users
    getUsers(req, res) {
        users.find({})
        // populate user Thoughts
        .populate({path: 'Thoughts', select: '-__v'})
        // populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get user by ID
    getUsersById({params}, res) {
        const myID = params.id.slice(1)
        users.findOne({_id: myID})
        .populate({path: 'Thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with exists with this ID!'});
                return; 
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Update User by ID
    updateUsers({params, body}, res) {
        users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User found with this ID!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },
    
    //delete User by ID
    deleteUsers({params}, res) {
        users.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

// Add Friend
addFriend({params}, res) {
    const myID = params.id.slice(1)
    const friendID = params.friendId.slice(1)
    users.findOneAndUpdate({_id: myID}, {$push: { friends: friendID}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({message: 'No User with exists with this ID!'});
            return;
        }
    res.json(dbUsersData);
    })
    .catch(err => res.json(err));
},

// Delete Friend
deleteFriend({ params }, res) {
    users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with exists with this ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
}

};

// Export users controller
module.exports = usersController; 
