
import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    //1. get ueser details from front end side 
    //2. validate user details
    //3. check if user already exists userName email
    //4. check for images 
    //5. upload then cloudinary, validate image
    //6. get Url Cloudinary 
    //7. create user object 
    //8. create user in database 
    //9. send response to front end side 
    //10. remove password and refresh token fields from response
    //11. check for user creation errors 
    //12. return response 

    const { userName, fullName, email, password } = req.body
    console.log(userName, fullName, email, password);


});


export {
    registerUser,
};