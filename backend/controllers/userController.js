import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;

    // Searching MongoDB for email
    const user = await User.findOne({ email });

    // Does user exist and password match?
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) // Generate Token and respond with it
        });
    } else {
        // Throw unauthorized status
        res.status(401)
        throw new Error("Invalid email or password");
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // Finding the user in MongoDB
    const user = await User.findById(req.user._id);

    // Was the user found?
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export { authUser, getUserProfile };