// import http
import http from "http";

// create port
const PORT = 3000;

// create server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
            <html>
        <head>
          <title>My Home Page</title>
        </head>
        <body style="font-family: Arial; text-align: center; background-color: #f4f4f4;">
          <h1 style="color: #333;">Welcome to My HTML Server! 🚀</h1>
          <p>This text is sent by node.js.</p>
        </body>
      </html>
            `);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404! Page Not Found</h1>");
    res.end();
  }
});

// start server
server.listen(PORT, () => {
  console.log(`🚀 server running on http://localhost:${PORT}`);
});
