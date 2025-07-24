import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
    ],
    userName: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trime: true,
        index: true,
    },

    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
        trime: true,
    },

    fullName: {
        type: String,
        trime: true,
        index: true,
    },
    avatar: {
        type: String, // cloudinary url 
        required: true,
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    }
}, { timeStamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();

})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sing({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName,
    }, ProcessingInstruction.env.ACCESS_TOKEN_SECRET, {
        expiresIn: ProcessingInstruction.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sing({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName,
    }, ProcessingInstruction.env.REFERSH_TOKEN_SECRET, {
        expiresIn: ProcessingInstruction.env.REFERSH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema);