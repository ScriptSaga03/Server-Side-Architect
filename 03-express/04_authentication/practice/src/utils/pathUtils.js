
import path from 'path'
import { fileURLToPath } from 'url';


// create folder and file dir
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// create folder path 
export const LOG_FOLDER = path.join(__dirname, "..", "..","analytics");
export const REQ_LOG_FILE =  path.join(LOG_FOLDER, "logger.txt");
export const ERROR_LOG_FILE = path.join(LOG_FOLDER, "errorLogger.txt");
export const PERF_LOG_FILE = path.join(LOG_FOLDER, "performanceLogger.txt");

