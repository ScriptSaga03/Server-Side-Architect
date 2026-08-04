



// create custom error
const createCustomError  = (statusCode, message) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    err.success = false;
    return err
}




export default createCustomError;