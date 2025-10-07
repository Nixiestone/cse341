/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - favoriteColor
 *         - birthday
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         firstName:
 *           type: string
 *           description: The first name of the contact
 *         lastName:
 *           type: string
 *           description: The last name of the contact
 *         email:
 *           type: string
 *           description: The email of the contact
 *         favoriteColor:
 *           type: string
 *           description: The favorite color of the contact
 *         birthday:
 *           type: string
 *           format: date
 *           description: The birthday of the contact
 *       example:
 *         _id: 64f1a2e85c2d4e3d5c8b9a7f
 *         firstName: Blessing
 *         lastName: Omoregie
 *         email: blessingomoregie52@gmail.com
 *         favoriteColor: Lilac
 *         birthday: 2003-01-20
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: The contacts managing API
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Returns the list of all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: The list of contacts
 */

// These are the paths to find our friends
const express = require('express');
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactsController');

const router = express.Router();

// Path to get ALL friends
router.route('/')
  .get(getContacts)
  .post(createContact);  

// Path to get ONE friend
router.route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact); // Assuming deleteContact is defined in contactsController.js

module.exports = router;