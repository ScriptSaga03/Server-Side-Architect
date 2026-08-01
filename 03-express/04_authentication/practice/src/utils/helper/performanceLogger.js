import fs from 'fs/promises';
import { LOG_FOLDER, PERF_LOG_FILE } from '../pathUtils.js';

export const perfLogger = (req, res, next) =>{
    const start = Date.now();
    req.startTime = start;
    res.on('finish', async () => {
        try {
            const now = new Date();

            const perfOBJ = {
                id: Date.now(),
                timeStamp : new Date().toISOString(),
                url : req.originalUrl,
                method: req.method,
                path:req.path,
                performance: Date.now() - req.startTime + 'ms',
                ip: req.ip,
                host: req.hostname,
                useragent : req.headers['user-agent'],
                statusCode: res.statusCode,
            }

            await fs.mkdir(LOG_FOLDER,{recursive:true});
            const performance= JSON.stringify(perfOBJ,null,2) + '\n';
            await fs.appendFile(PERF_LOG_FILE, performance, 'utf-8')
            
        } catch (error) {
            console.log(`⚠ Log write error! ${error}`)
        }
    })
    next();
}