// Import the Express module to create a web server
import express from 'express';

// Import functions from the utils.js file
import { serverStatus, triggerHeavyWorkload } from './utils.js';

// Create an Express application instance
const app = express();

// Define a route handler for the root path ('/')
// (assumed behavior from ./utils.js)
app.get('/', serverStatus);

// Define a route handler for the '/heavy' path
// (assumed behavior from ./utils.js)
app.get('/heavy', triggerHeavyWorkload);

// Start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log(`Worker process ${process.pid} is listening on port 3000`);
});