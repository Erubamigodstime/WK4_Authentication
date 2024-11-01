const db = require('../model/index');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const User = db.users;








const getHomePage = (req, res) => {
    // res.render('home'); 
    res.send('It is working')
};







/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               favouriteColor:
 *                 type: string
 *                 description: User's favorite color
 *               birthday:
 *                 type: string
 *                 description: User's birthdate in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 favouriteColor:
 *                   type: string
 *                 birthday:
 *                   type: string
 *       400:
 *         description: Content can not be empty
 *       500:
 *         description: Some error occurred while creating the user
 */
const createUsers =  async(req, res) =>{
   if (!req.body) {
     res.status(400).send({ message: 'Content can not be empty!' });
     return;
   }
 
   const user = new User({
     _id: new mongoose.Types.ObjectId(),
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     FavouriteColor: req.body.FavouriteColor,
     birthday: req.body.birthday,
   });
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



/**
 * @swagger
 * /user/getOne/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - name: apiKey
 *         in: header
 *         required: true
 *         description: API key for authentication
 *         schema:
 *           type: string
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 favouriteColor:
 *                   type: string
 *                 birthday:
 *                   type: string
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Cannot find user with the specified ID
 *       500:
 *         description: Error retrieving user
 */
const getOneUser = async (req, res)=>{
    const user_id = req.params.id;
    const receivedApiKey = req.header('apiKey')
  if (receivedApiKey === process.env.apiKey) {
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






/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users in the database
 *     parameters:
 *       - name: apiKey
 *         in: header
 *         required: true
 *         description: API key for authentication
 *         schema:
 *           type: string
 *     security:
 *       - ApiKeyAuth: []   # This adds the API key requirement
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   favouriteColor:
 *                     type: string
 *                   birthday:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Some error occurred while retrieving users
 */
const getAllUsers = async (req, res)=>{
  const receivedApiKey = req.header('apiKey');

  if (receivedApiKey === process.env.apiKey) {
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



/**
 * @swagger
 * /user/update/{id}:
 *   post:
 *     summary: Update a user
 *     description: Update a user's details by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               favouriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Data to update cannot be empty
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */
const updateUsers = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update cannot be empty!',
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else {
        res.send({ message: 'User was updated successfully.' },{data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating User with id=' + id,
      });
    });
};



/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: User not found
 *       500:
 *         description: Could not delete user
 */
const deleteUser =  async(req, res) =>{
    const id = req.params.id;

  User.findByIdAndDelete(id)
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



/**
 * @swagger
 * /user/deleteAll:
 *   delete:
 *     summary: Delete all users
 *     description: Delete all users in the database
 *     responses:
 *       200:
 *         description: All users deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message with the number of deleted users
 *       500:
 *         description: Error occurred while removing all users
 */
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
    updateUsers,
    deleteUser,
    createUsers,
    deleteAllUsers,
    getHomePage
}