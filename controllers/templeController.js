const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const passport = require('passport');
const mongoose = require('mongoose');
const db = require('../model/index');
const Temple = db.temples;










/**
 * @swagger
 * /temple/create:
 *   post:     
 *     summary: Create a new temple
 *     description: Create a new temple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temple_id:
 *                 type: integer
 *               additionalInfo:
 *                 type: boolean
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               dedicated:
 *                 type: string
 *     responses:
 *       200:
 *         description: Temple created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 temple_id:
 *                   type: integer
 *                 additionalInfo:
 *                   type: boolean
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 dedicated:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const createTemples = async (req, res) => {
    console.log('it just started')
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
    console.log('it has passed first stage')
    const temple = new Temple({
        _id: new mongoose.Types.ObjectId(),
        temple_id: req.body.temple_id,
        additionalInfo: req.body.additionalInfo,
        name: req.body.name,
        location: req.body.location,
        dedicated: req.body.dedicated
    });
    console.log('it has passed second stage')

    console.log(temple)
    temple.save()
        .then((data) => {
            res.status(200).send({ message:'Temple created Successfully'},{data},)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Temple.',
            });
        });
};








/**
 * @swagger
 * /temple/getOne/{id}:
 *   get:
 *     summary: Get a temple by ID
 *     description: Get a temple by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the temple to retrieve
 *         schema:
 *           type: string
 *       - name: apiKey
 *         in: header
 *         required: true
 *         description: API key for authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Temple retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 temple_id:
 *                   type: integer
 *                 additionalInfo:
 *                   type: boolean
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 dedicated:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Temple not found
 *       500:
 *         description: Internal Server Error
 */
const getOneTemple = async (req, res) => {
    const id = req.params.id;
    if (req.header('apiKey') === process.env.apiKey) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        Temple.findById(id)
            .then((data) => {
                if (!data) {
                   return  res.status(404).send({ message: 'Cannot find temple with the ID ' + id });
                } else {
                   return  res.send(data);
                }
            })
            .catch((err) => {
               return  res.status(500).send({ message: 'Error retrieving Temple with ID=' + id });
            });
    } else {
       return  res.send('Invalid apiKey, please read the documentation.');
    }
};






/**
 * @swagger
 * /temple/getAll:
 *   get:
 *     summary: Get all Temples
 *     description: Get all Temples
 *     parameters:
 *       - name: apiKey
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: Temples retrieved successfully
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               temple_id:
 *                 type: integer
 *               additionalInfo:
 *                 type: boolean
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               dedicated:
 *                 type: string
 *       500:
 *         description: Internal Server Error
 */
const getAllTemples = async (req, res) => {
    if (req.header('apiKey') === process.env.apiKey) {
        Temple.find({}, {
            _id: 1,
            temple_id: 1,
            additionalInfo: 1,
            name: 1,
            location: 1,
            dedicated: 1
        })
        .then((data) => {
           return res.send(data);
        })
        .catch((err) => {
           return res.status(500).send({ message: err.message || 'Some error occurred while retrieving temples.' });
        });
    } else {
       return res.send('Invalid apiKey, please read the documentation.');
    }
};




/**
 * @swagger
 * /temple/update/{id}:
 *   put:
 *     summary: Update a temple with the ID
 *     description: Update a temple's details by their ID
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
 *               temple_id:
 *                 type: string
 *               additionalInfo:
 *                 type: Boolean
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               dedicated:
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
const updateTemple = async (req, res) => {  

    try {
        if (!req.body) {
            return res.status(400).send({ message: 'Data to update cannot be empty!' });
        }
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const temple = await Temple.findByIdAndUpdate(id, req.body, { new: true });
        if (!temple) {
            return res.status(404).send({ message: `Cannot update temple with id=${id}.
                Maybe temple was not found!`
        })}       
        return res.send({ message: 'Temple was updated successfully.' });
        } catch (err) {
            return res.status(500).send({ message: 'Error updating Temple with id=' + id
                , message: err });
         }
   

};






/**
 * @swagger
 * /temple/delete/{id}:
 *   delete:
 *     description: Delete a temple by ID
 *     summary: Delete a temple by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Temple deleted successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Temple not found
 *       500:
 *         description: Internal Server Error
 */
const deleteTemple = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID format' });
    }
    Temple.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
               return res.status(404).send({ message: `Cannot delete temple with id=${id}. Maybe temple was not found!` });
            } else {
               return res.send({ message: 'Temple was deleted successfully!' });
            }
        })
        .catch((err) => {
           return res.status(500).send({ message: 'Could not delete temple with id=' + id },{message: err});
        });
};






module.exports = {
    getOneTemple,    
    getAllTemples,    
    updateTemple,
    deleteTemple,
    createTemples,
    // googleLogout
};
