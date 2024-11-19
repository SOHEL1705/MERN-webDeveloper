// Import required modules
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

// Define the authMiddleware function for authenticating requests
const authMiddleware = async (req, res, next) => {

    // Retrieve the token from the Authorization header
    const token = req.header("Authorization");
    
    // Check if the token is provided; if not, return a 401 Unauthorized response
    if (!token) {
        // Sends a 401 response indicating the request is unauthorized due to a missing token
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Remove "Bearer" prefix from the token string (if present) and trim whitespace
    const jwt_token = token.replace("Bearer", "").trim();
    
    try {
        // Verify the token using the secret key from the environment variables
        const isVerified = jwt.verify(jwt_token, process.env.JWT_SECRET);
        
        // Find the user associated with the verified token's email in the database
        const userData = await User.findOne({ email: isVerified.email })
            .select("-password"); // Exclude the password field from the retrieved data

        // Attach user data and token information to the request object for further use
        req.user = userData;
        req.token = jwt_token;
        req.userId = userData._id;

        // Move to the next middleware or route handler if the user is successfully authenticated
        next();

    } catch (error) {
        // If token verification fails, return a 401 Unauthorized response
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

// Export the authMiddleware function to use it in route protection
module.exports = authMiddleware;
