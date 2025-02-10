// Import HTTP status codes for cleaner response handling
const HttpStatusCodes = require('http-status-codes');

// In-memory database to store superheroes (not persistent)
const superherosDB = [];

/**
 * Adds a new superhero to the database.
 * 
 * @param {Object} request - Express request object containing superhero details in the body.
 * @param {Object} response - Express response object to send back status and messages.
 * 
 * @returns {Object} HTTP Response with success or error status.
 */
const addSuperhero = async (request, response) => {
    // Destructure expected superhero properties from the request body
    const { name, superpower, humility_score } = request.body;

    try {
        // Add superhero to the in-memory database
        superherosDB.push({
            name,
            superpower,
            humility_score
        });

        console.log(superherosDB); // Log updated database for debugging

        // Return success response
        return response.status(HttpStatusCodes.OK).send("done");
    } catch (err) {
        // Handle potential errors gracefully
        return response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
};

// Export the function to be used in other modules
module.exports = {
    addSuperhero
};