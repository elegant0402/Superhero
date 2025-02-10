const app = require('./app');
const server = require('http').createServer(app);

//Create server 
const PORT = 5000
server.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`)
});