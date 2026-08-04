
// Import 
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import { json } from 'stream/consumers';



// create an express app 
const app = express();


// Folder And Filepath
const __filename = fileURLToPath(import.meta.url);
console.log('file name: ', __filename)
const __dirname = path.dirname(__filename);
console.log('dir name: ', __dirname);




// Global Third-Pary Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Logs Folder Path 
const LOG_FOLDER = path.join(__dirname, 'logs');
const REQUEST_LOG_FILE = path.join(LOG_FOLDER, 'logger.txt');
const PERF_LOG_FILE = path.join(LOG_FOLDER, 'performance.json')


// Custom application level middleware
//  1) Logger
app.use(async (req, res, next) => {
    try {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        // Template string for plain text file (JSON.stringify nahi karna string par!)
        const log = `------------------------------------
Full      : ${now.toISOString()}
Date      : ${date}
Time      : ${time}
Method    : ${req.method}
URL       : ${req.originalUrl}
IP        : ${req.ip}
Protocol  : ${req.protocol}
Host      : ${req.hostname}
Path      : ${req.path}
------------------------------------\n\n`;

        // Folder create karega agar exist nahi karta
        await fs.mkdir(LOG_FOLDER, { recursive: true });

        // Plain text append hoga file me
        await fs.appendFile(REQUEST_LOG_FILE, log, 'utf-8');

        next();
    } catch (error) {
        next(error);
    }
});


// ==========================================
// ⏱️ Performance Logger (JSON Array Format)
// ==========================================
app.use((req, res, next) => {
    const start = process.hrtime();

    res.on('finish', async () => {
        const diff = process.hrtime(start);
        const durationInMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

        // 1. Log Object
        const perfLog = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            responseTimeMs: Number(durationInMs),
            status: durationInMs > 500 ? 'SLOW' : 'FAST'
        };

        // Terminal Warning
        if (durationInMs > 500) {
            console.warn(`⚠️ [SLOW API WARNING]: ${req.method} ${req.originalUrl} took ${durationInMs} ms!`);
        } else {
            console.log(`⏱️ [PERF]: ${req.method} ${req.originalUrl} - ${res.statusCode} in ${durationInMs} ms`);
        }

        try {
            await fs.mkdir(LOG_FOLDER, { recursive: true });

            let logs = [];

            // 2. Purani File Read Karo (Agar exist karti hai)
            try {
                const fileData = await fs.readFile(PERF_LOG_FILE, 'utf-8');
                logs = JSON.parse(fileData); // Text -> JS Array
            } catch (readErr) {
                // Agar file abhi tak bani nahi hai, toh Array empty hi rahega []
                logs = [];
            }

            // 3. Array mein naya log PUSH karo
            logs.push(perfLog);

            // 4. 🔥 SABSE IMPORTANT FIX: appendFile ki jagah writeFile!
            // Kyunki poore Array ko wapas standard JSON Format me format karke save karna hai.
            await fs.writeFile(PERF_LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');

        } catch (fileErr) {
            console.error("🔥 Performance log Write Error:", fileErr.message);
        }
    });

    next();
});








// route 
app.get('/', (req, res) => {
    res.json({
        message: 'users fetched successfully'
    })
})


app.get('/api/users/search', (req, res) =>{
    res.json({
        message: 'search',
        clearnQuery : req.query
    })
})





// Create PORT 
const PORT = process.env.PORT || 3000;


// start server listening 
app.listen(PORT, () => {
    console.log(`🚀  Express server is running on http://localhost:${PORT}`);
})