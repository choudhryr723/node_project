
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) =>
            next(error)
        )
    }
}

// const asyncHandlerNext = (func) => async (req, res, next) => {
//     try {
//         return await func(req, res, next);
//     } catch (error) {
//         console.error("Error occurred in async handler:", error);
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//             error: error.stack || "No stack trace available"
//         })
//     }
// }


export { asyncHandler };