// Import the createClient function from the 'redis' library
const { createClient } = require("redis");
// Load environment variables from a .env file
require("dotenv").config();
// Retrieve Redis credentials from environment variables

// Create a Redis client with the specified connection details
const redisClient = createClient({
    password: "Q6MVzonRTq7BCm0qp5kG70Xwc2oWe8VM",
    socket: {
        host: 'redis-13936.c14.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 13936
    }
});
// Event handler for Redis client errors
redisClient.on("error", (err) => {
    console.log({'error':'error at redis',err});
});
// Connect to the Redis server asynchronously using an immediately invoked async function
(async () => await redisClient.connect())();
// Event handler for Redis client ready state
redisClient.on("ready", () => {
    console.log("Redis connected");
});
// Export the Redis client for use in other parts of the application
module.exports = {
    redisClient
};
