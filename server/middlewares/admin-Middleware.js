// Define the adminMiddleware function to handle admin-only access
const adminMiddleware = async (req, res, next) => {
  try {
    // Check if the authenticated user has admin privileges
    const admin_user = req.user.isAdmin;

    // If the user is not an admin, deny the request with a 403 Forbidden response
    if (!admin_user) {
      return res.status(403).send({ message: "Request Denied - You are not an Admin" });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();

  } catch (error) {
    // Pass any errors to the global error handling middleware
    next(error);
  }
};

// Export the adminMiddleware function to use it in route protection
module.exports = adminMiddleware;
