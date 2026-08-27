

// Method 1
//    const asyncHandler = (fn)=>{
//     return (req, res, next)=>{
//         Promise.resolve(fn(req,res, next)).catch(next)
//     }
// }

// Method 2

// const asyncHandler = (fn)=>(req, res, next)=>{
//     return Promise.resolve(fn(req, res, next)).catch(next)
// };

// Method 2 Modern and I would prefer this method
const asyncHandler = fn => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        next(error)
    }
};

export default asyncHandler;