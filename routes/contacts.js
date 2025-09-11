// These are the paths to find our friends
const express = require('express');
const {
  getContacts,
  getContact
} = require('../controllers/contactsController');

const router = express.Router();

// Path to get ALL friends
router.route('/').get(getContacts);

// Path to get ONE friend
router.route('/:id').get(getContact);

module.exports = router;