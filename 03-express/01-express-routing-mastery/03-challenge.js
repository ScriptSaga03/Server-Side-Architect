
/*


📥 Problem 3: The Secured Invoice (Redirect & Download Mix)
Route A: /download-invoice
Logic: Apne folder mein ek chhoti si invoice.txt file bana lo. 
Is route par aane wale ko res.download(filePath) ke zariye wo file force download karwa do. 
(Yahan path module aur __dirname ka use hoga jo tumne Node mein seekha tha!)

Route B: /old-invoice-path
Logic: Agar koi is purane route par aaye, 
toh use res.redirect('/download-invoice') marna hai taaki wo naye route par chala jaye.

*/


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);







const app = express();


// Home Page
app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>`)
});



// problem 3 invoice download and redirect
app.get('/download-invoice', (req, res) => {
    const filePath = path.join(__dirname, 'invoice.txt');
    res.download(filePath, 'invoice.txt', (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("File download failed.");
        }
    });
});

// permanentaly redirect
app.get('/old-invoice-path', (req, res) => {
    res.redirect(301,'/download-invoice');
});



// server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})


 
