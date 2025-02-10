// Importing the Express framework
var express = require('express');

// Creating an instance of an Express router
var router = express.Router();

// Importing the controller function for adding a superhero
var { addSuperhero } = require('../Controller/SuperheroController');

/**
 * @route   POST /superheros
 * @desc    Handles adding a new superhero
 * @access  Public (or specify authentication if required)
 */
router.post('/superheros', async (request, response) => {
    // Calling the addSuperhero function to handle the request
    addSuperhero(request, response);
});

// Exporting the router to be used in other parts of the application
module.exports = router;