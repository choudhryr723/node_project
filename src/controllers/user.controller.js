
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
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
    if ([userName, fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Full name is required")
    }
    const existedUser = await User.findOne({ $or: [{ userName }, { email },] })
    if (existedUser) {
        throw res.status(404).json(new ApiResponse(404, {}, "already exist username and email",))
    }
    const avatarLocalImage = await req.files?.avatar[0]?.path;
    const coverImageLocalImage = await req.files?.coverImage[0]?.path;
    console.log("All uploaded files:", req.files);
    console.log("Avatar file:", req.files?.avatar);
    console.log("Avatar path:", req.files?.avatar?.[0]?.path);
    if (!avatarLocalImage) {
        throw new ApiError("400", "Avatar is required");
    }
    const avatarImage = await uploadImage(avatarLocalImage)
    const coverImageUpload = await uploadImage(coverImageLocalImage)
    console.log("Avatar image", avatarImage.url);
    console.log("Cover image", avatarImage.url);
    if (!avatarImage) {
        throw new ApiError(400, "Failed to upload avatar image");
    }

    const userData = await User.create({
        userName: userName,
        fullName,
        email,
        password,
        // avatar: avatarImage?.url,
        // coverImage: coverImageUpload?.url || "",
    })
    const createdUser = await User.findByIdAndUpdate(userData._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user");
    }
    return res.status(200).json(new ApiResponse(200, createdUser, "User created successfully",));
});


const loginUser = asyncHandler(async (req, res) => {
    const userDetails = { email, username, password } = req.body;
    if (!userDetails.username || !userDetails.email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = User.findOne({
        $or: [{
            userName
        }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password");
    }
    const { accessToken, refershToken } = await generateAccessAndRefereshToken(user._id);
    if (!accessToken || !refershToken) {
        throw new ApiError(500, "Failed to generate tokens");
    }
    const loginedUser = await User.findById(user._id);
    select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true,

    }

    return res.status(200).
        cookie("accessToken", accessToken, options).
        cookie("refreshToken", refershToken, options).
        json(new ApiResponse(200, { loginUser, accessToken, refershToken }, "User logged in successfully"))
});




const generateAccessAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = await user.generateAccessToken();
        const refershToken = await user.generateRefreshToken();
        user.refershToken = refershToken
        await user.save({ vaildateBeforeSave: false });
        return {
            accessToken,
            refershToken,
        }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
}




const logOutUser = asyncHandler(async (req, res) => {
    
})

export {
    registerUser,
    loginUser
};