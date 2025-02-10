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

/**
 * Retrieves the list of superheroes sorted by humility score in ascending order.
 * 
 * - This function assumes `superherosDB` is an in-memory array of superhero objects.
 * - Sorting is done in-place, which mutates the original array.
 * - No pagination or filtering is applied, which may cause performance issues if the dataset is large.
 * - Ensure `humility_score` exists and is a valid number in all objects to avoid unexpected sorting behavior.
 * - Considers potential error handling improvements (e.g., wrapping sort logic in a safer way).
 * 
 * @param {Object} request - Express request object (not currently used in the function).
 * @param {Object} response - Express response object to send the sorted superheroes list.
 * @returns {Response} HTTP response with sorted superheroes or an error message.
 */
const getSuperheros = async (request, response) => {
    try {
        // Sorting superheroes by humility_score in ascending order (mutates the original array)
        superherosDB.sort((a, b) => b.humility_score - a.humility_score);

        // Returning the sorted list with HTTP 200 OK status
        return response.status(HttpStatusCodes.OK).send(superherosDB);
    } catch (err) {
        // Handling unexpected errors gracefully and returning HTTP 500
        return response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
};

// Export the function to be used in other modules
module.exports = {
    addSuperhero,
    getSuperheros
};