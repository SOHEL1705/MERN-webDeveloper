//! Import required modules
const express = require('express');
const router = express.Router();

//* Import controller for User functions for handling routes
const {
  getAllUsers,
  deleteUserByID,
  getUserByID,
  updateUserByID,
} = require('../controllers/admin-controller');

//* Import controller for Contact functions for handling routes
const {
  getAllContacts,
  deleteContactByID
} = require('../controllers/contact-controller');

//* Import middlewares for authentication and authorization
const authMiddleware = require('../middlewares/auth-middleware'); // Checks if user is authenticated
const adminMiddleware = require('../middlewares/admin-Middleware'); // Checks if authenticated user has admin privileges

//* =================== Routes Configuration ===================
// [authMiddleware] validates the token to ensure the user is authenticated
// [adminMiddleware] checks if the authenticated user has admin privileges

//* Route to get all users
// - This route is protected by authMiddleware and adminMiddleware
// - Only authenticated users with admin access can retrieve all user data
router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers);

//* Route to get single users
// - This route is protected by authMiddleware and adminMiddleware
// - Only authenticated users with admin access can retrieve all user data
router.route('/users/:id').get(authMiddleware, adminMiddleware, getUserByID);

//* Route to delete a user
// - This route is protected by authMiddleware and adminMiddleware
// - Only authenticated users with admin access can delete users
router.route('/users/delete/:id').delete(authMiddleware, adminMiddleware, deleteUserByID);

//* Route to update a user
// - This route is protected by authMiddleware and adminMiddleware
// - Only authenticated users with admin access can delete users
router.route('/users/update/:id').patch(authMiddleware, adminMiddleware, updateUserByID);

// Route to get all contacts
// - This route is also protected by both authMiddleware and adminMiddleware
// - Only authenticated admin users can access the contact data
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);

//* Route to delete a contact
// - This route is protected by authMiddleware and adminMiddleware
// - Only authenticated users with admin access can delete users
router.route('/contacts/delete/:id').delete(authMiddleware, adminMiddleware, deleteContactByID);

// Export the router to make it available in other parts of the application
module.exports = router;
