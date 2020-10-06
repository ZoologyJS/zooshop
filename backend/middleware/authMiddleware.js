import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async(req, res, next) => {
    let token;

    // Attempting to decode the given JWT
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            
            // Returns user ID, "Issued At", and Expiration from JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User's data
            req.user = await User.findById(decoded.id).select("-password");
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized: Bad token")
        }
    }

    // Is there a token?
    if (!token) {
        res.status(401);
        throw new Error("Not authorized: No token");
    }
})

export { protect };