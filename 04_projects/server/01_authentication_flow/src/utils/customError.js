


const AppError = (statusCode=500 , msg="something went wrong...") =>{
    const err = new Error(msg);
    err.statusCode = statusCode
    return err;
};

export default AppError;

