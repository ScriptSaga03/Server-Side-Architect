
// import http 
import http from 'http';


// create port
const PORT = process.env.PORT || 3000;


// create server 
const server = http.createServer((req, res) =>{
    res.writeHead(200, {'Content-Type' : 'application/json'});
    
    // res.end(JSON.stringify({msg:'Hello Mehtab', status: 200}));

    // create user object
    const userProfile = {
        name:'Mehtab',
        role:'Backend-Developer',
        active:true
    };
        res.end(JSON.stringify(userProfile));
});


// server
server.listen(PORT, () =>{
    console.log(`🚀🚀 server is running on http://localhost:${PORT}`);
})
