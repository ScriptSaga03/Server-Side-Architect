// Import the http module
import http from "http";


// Define the port number
const PORT = 3000;


// Create an HTTP server
const server = http.createServer((req, res) => {
    console.log("Received a request!", req); // log when a request is received
    console.log(`Received request: ${req.method} ${req.url}`); // log incoming requests
    res.writeHead(200, { "Content-Type": "text/plain" });  // send HTTP status and headers
    res.write("Hello, World! This is a simple HTTP server."); // send response body
    res.end(); // end the response
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});
