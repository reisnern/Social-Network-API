// Require users Model
const {users} = require('../models');

// Set up Controller
const usersController = {
    
    // Create new User
    createusers({body}, res) {
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
    getAllusers(req, res) {
        users.find({})
        // populate user thoughts
        .populate({path: 'thoughts', select: '-__v'})
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
    getusersById({params}, res) {
        users.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
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
    updateusers({params, body}, res) {
        users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbusersData => {
            if(!dbusersData) {
                res.status(404).json({message: 'No User with exists with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    deleteusers({params}, res) {
        users.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with exists with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

// Delete user by ID
addFriend({params}, res) {
    users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No User with exists with this ID!'});
            return;
        }
    res.json(dbusersData);
    })
    .catch(err => res.json(err));
},

// Delete Friend
deleteFriend({ params }, res) {
    users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbusersData => {
        if(!dbusersData) {
            res.status(404).json({message: 'No User with exists with this ID!'});
            return;
        }
        res.json(dbusersData);
    })
    .catch(err => res.status(400).json(err));
}

};

// Export users controller
module.exports = users; 
