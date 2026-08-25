

const customError = (statusCode=500 , message="Something went wrong") =>{
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
}

export default customError;