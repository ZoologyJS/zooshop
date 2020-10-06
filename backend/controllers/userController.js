import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;

    // Searching MongoDB for given email
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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;

    // Searching MongoDB for given email
    const userExists = await User.findOne({ email });

    // Does the user already exist in MongoDB?
    if (userExists) {
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    // Was the user created successfully?
    if (user) {
        // Respond with success and their user data
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) // Generate Token and respond with it
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
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

export { authUser, registerUser, getUserProfile };