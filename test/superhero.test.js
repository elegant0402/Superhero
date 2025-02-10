// Import necessary dependencies
const request = require('supertest');
const app = require("../app"); // Import the app instance for testing
const HttpStatusCodes = require('http-status-codes'); // Import HTTP status codes for better readability in assertions

// Describe the test suite for the POST /addSuperhero endpoint
describe('POST /superheros', () => {

    // Test case to validate successful addition of a superhero to the database
    it('should add a superhero to the database and return status 200', async () => {
        // Test data: superhero object
        const superhero = { name: 'Superman', superpower: 'Flying', humility_score: 8 };
        
        // Sending a POST request to add the superhero
        const response = await request(app)
            .post('/superheros')
            .send(superhero); // Send superhero object as the request body
        
        // Assert that the response status is OK (200) indicating success
        expect(response.status).toBe(HttpStatusCodes.OK);
        
        // Assert that the response text is 'done' confirming successful action
        expect(response.text).toBe('done');

        // Make a GET request to check if the superhero is successfully added to the database
        const response1 = await request(app)
            .get('/superheros') // Get all superheroes from the database
            .send(); // No body required for GET request
        
        // Parse the response to get the list of superheroes
        const result = JSON.parse(response1.text);
        
        // Assert that the superhero has been added to the database (length of the list should be 1)
        expect(result.length).toBe(1); 
        
        // Assert that the superhero object matches the one added
        expect(result[0]).toEqual(superhero); 
    });

    // Test case to handle invalid input (humility_score out of bounds)
    it('should return a 400 if humility_score is out of bounds', async () => {
        // Test data: superhero object with invalid humility_score
        const superhero = { name: 'Superman', superpower: 'Flying', humility_score: 15 };
        
        // Sending a POST request with an invalid superhero
        const response = await request(app)
            .post('/superheros')
            .send(superhero); // Send superhero object as the request body
        
        // Assert that the response status is BAD_REQUEST (400)
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
        
        // Assert that the response message contains the validation error for humility_score
        expect(response.text).toBe('humility_score should be between 0 and 10');
    });
});