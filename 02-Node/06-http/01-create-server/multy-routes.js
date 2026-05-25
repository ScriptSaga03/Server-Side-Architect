import http from "http";

// define the port number
const PORT = process.env.PORT || 3000;

// create server
const server = http.createServer((req, res) => {
  
  // handle different routes
  // http://localhost:3000/ => This is a home page!
  // http://localhost:3000/about => This is a about page!
  // http://localhost:3000/contact-us => This is a contact us page! 
  // http://localhost:3000/any-other-route => 404! Page not found!


  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("This is a home page!");
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("This is a about page!");
    res.end();
  } else if (req.url === "/contact-us") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("This is a contact us page!");
    res.end();
  }else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404! Page not found!");
    res.end();
  }
});

// start server
server.listen(PORT, () => {
  console.log(`🚀 server is running on http://localhost:${PORT}`);
});
