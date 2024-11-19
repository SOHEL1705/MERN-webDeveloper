// Import the schema from the user model
const { schema } = require("../models/user-model");

// Middleware function to validate the request body against the provided schema
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = req.body = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // If validation fails, create and log error details
    const error = {
      status: 442,
      message: "Fill required fields",
      details: err.errors?.[0]?.message || "Invalid data",
    };

    console.error(error);
    res.status(error.status).json(error);
  }
};

// Export the validate middleware
module.exports = validate;
