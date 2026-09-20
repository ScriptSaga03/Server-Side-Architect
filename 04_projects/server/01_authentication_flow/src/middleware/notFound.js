

const routeNotFound = (req , res, next) =>{
    const msg = new Error(`❌ Can't find ${req.originalUrl} on this server!`);
    msg.statusCode = 404;
    next(msg);
}

export default routeNotFound;