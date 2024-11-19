const User = require('../models/user-model')


//**--------------------------------------[Get All Users Controller]-------------------------------------- */
const getAllUsers = async (req, res, next) => {
  try {
    // Pagination with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting with default sorting by `createdAt`
    const sort = req.query.sort || 'createdAt';

    // Field selection for optimization
    const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '';

    // Filtering based on query parameters
    const filter = { ...req.query };
    delete filter.page;
    delete filter.limit;
    delete filter.sort;
    delete filter.fields;

    // Query to fetch users with selected options
    const userData = await User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(fields)
      .select('-password'); // Exclude password by default

    // Check if users are found
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Total count for pagination
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    // Send successful response with pagination details
    res.status(200).json({
      message: "All Users Found Successfully",
      userData,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error); // Pass error to error-handling middleware
  }
};

//**--------------------------------------[Get Single User Controller]-------------------------------------- */
const getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findOne({ _id: id }, { password: 0 })
    res.status(200).json({  userData })
  } catch (error) {
    next(error);
  }
}

//**--------------------------------------[Update User Controller]-------------------------------------- */
const updateUserByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    
    console.log("Updating user data:", updatedUser);
    
    const userUpdatedData = await User.updateOne({ _id: id }, {
      $set: updatedUser
    });

    if (userUpdatedData.modifiedCount === 0) {
      return res.status(404).json({ message: "User  Not Found or Data is Identical" });
    }

    return res.status(200).json({ message: "User Updated Successfully", userUpdatedData });
    
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};


//**--------------------------------------[Delete User Controller]-------------------------------------- */

const deleteUserByID = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete user by ID
    const result = await User.deleteOne({ _id: id });

    // Check if a user was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);  // Pass the error to the next middleware (for error handling)
  }
};


module.exports = { getAllUsers, deleteUserByID, getUserByID, updateUserByID }