import fs from 'fs/promises';
import { ERROR_LOG_FILE, LOG_FOLDER } from '../pathUtils.js';

const errLogger = async (err, req, res) => {
    try {
        const statusCode = err.statusCode || err.status || 500;
        const message = err.message || 'Internal Server Error';

        const errOBJ = {
            timeStamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            statusCode: statusCode,
            errorMessage: message,
            stackTrace: err.stack 
        };

        await fs.mkdir(LOG_FOLDER, { recursive: true });
        const errLog = JSON.stringify(errOBJ, null, 2) + '\n---\n';
        await fs.appendFile(ERROR_LOG_FILE, errLog, 'utf-8');
        
    } catch (fsErr) {
        console.error("🔥 Failed to write error log:", fsErr.message);
    }
};

export default errLogger;