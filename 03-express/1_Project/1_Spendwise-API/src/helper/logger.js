import winston from "winston";

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
);

const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        // 1. Terminal Console
        new winston.transports.Console(),
        // 2. Combined Logs
        new winston.transports.File({ filename: "logs/combine.log" }),
        // 3. Error Logs Only
        new winston.transports.File({ filename: "logs/error.log", level: "error" })
    ]
});

export default logger;