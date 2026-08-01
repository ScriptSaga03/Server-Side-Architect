import fs from 'fs/promises';
import { LOG_FOLDER, REQ_LOG_FILE } from '../pathUtils.js';

export const reqLogger = (req, res, next) =>{
    res.on('finish', async () => {
        try {
            const now = new Date();

            const logOBJ = {
                id: Date.now(),
                requestDate : now.toLocaleDateString(),
                requestTime : now.toLocaleTimeString(),
                // timeStamp : new Date().toISOString(),
                url : req.originalUrl,
                method: req.method,
                path:req.path,
                ip: req.ip,
                host: req.hostname,
                useragent : req.headers['user-agent'],
                statusCode: res.statusCode,
            }

            await fs.mkdir(LOG_FOLDER,{recursive:true});
            const logs = JSON.stringify(logOBJ,null,2) + '\n';
            await fs.appendFile(REQ_LOG_FILE, logs, 'utf-8')
            
        } catch (error) {
            console.log(`⚠ Log write error! ${error}`)
        }
    })
    next();
}