// Import required modules
import os from 'os';
import cluster from 'cluster';
import express from 'express';
import { serverStatus, triggerHeavyWorkload } from './utils.js';

// Get the number of available CPUs
const numCPUs = os.cpus().length;

// Check if this is the primary process (parent process)
if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`);

    // Fork worker processes for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for worker process exit events
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    // This code runs inside worker processes

    // Create an Express application
    const app = express();

    // Define routes
    app.get('/', serverStatus);  // Route handler for health check endpoint (assumed behavior from ./utils.js)
    app.get('/heavy', triggerHeavyWorkload);  // Route handler for heavy workload endpoint (assumed behavior from ./utils.js)

    // Start the server on port 3000
    const server = app.listen(3000, () => {
        console.log(`Worker process ${process.pid} is listening on port 3000`);
    });
}