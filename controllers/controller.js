const db = require('../model/index');
const mongoose = require('mongoose');

const User = db.users;


const apiKey =
  'Ezl0961tEpx333UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';


const homePage = (req, res)=>{
    res.json({title: 'Home Page', body: 'This is the Home page'}); 

}
const createUsers =  async(req, res) =>{
    // Validate request
   if (!req.body) {
     res.status(400).send({ message: 'Content can not be empty!' });
     return;
   }
 
   // Create a user
   const user = new User({
     _id: new mongoose.Types.ObjectId(),
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     FavouriteColor: req.body.FavouriteColor,
     birthday: req.body.birthday,
   });
   // Save user in the database
   user
     .save(user)
     .then((data) => {
       res.send(data);
     })
     .catch((err) => {
       res.status(500).send({
         message:
           err.message || 'Some error occurred while creating the Temple.',
       });
     });
     
 
 }
// Find a single user with an ID
const getOneUser = async (req, res)=>{
    const user_id = req.params.id;
  if (req.header('apiKey') === apiKey) {
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
      }
    User.find({ _id: user_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Can not find user with the Id ' + user_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Temple with temple_id=' + user_id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
       

}

const getAllUsers = async (req, res)=>{
    console.log(req.header('apiKey'));
  if (req.header('apiKey') === apiKey) {
    User.find(
      {},
      {
        _id: 1,
        firstName: 1,
        lastName: 1,
        favouriteColor: 1,
        birthday: 1,
        email:1
       
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving temples.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
}

const updateUsers = async(req, res) =>{
    if (!req.body) {
        return res.status(400).send({
          message: 'Data to update can not be empty!',
        });
      }
    
      const id = req.params.id;
    
      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with id=${id}. Maybe Temple was not found!`,
            });
          } else res.send({ message: 'User was updated successfully.' });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Error updating User with id=' + id,
          });
        });

};
const deleteUser =  async(req, res) =>{
    const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else {
        res.send({
          message: 'Temple was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Temple with id=' + id,
      });
    });

}

const deleteAllUsers = (req, res) => {
    User.deleteMany({})
      .then((data) => {
        res.send({
          message: `${data.deletedCount} Temples were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while removing all temple.',
        });
      });
  };

module.exports = {
    getOneUser,    
    getAllUsers,
    homePage,
    updateUsers,
    deleteUser,
    createUsers,
    deleteAllUsers
}