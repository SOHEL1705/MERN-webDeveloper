const Contact = require('../models/contact-model')

//**--------------------------------------[Contact Controller]-------------------------------------- */
const getAllContacts = async (req, res) => {
  try {
    // Pagination with defaults for page and limit
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting based on a query parameter (e.g., `?sort=name` or `?sort=-createdAt` for descending)
    const sort = req.query.sort || 'createdAt';

    // Field selection (e.g., `?fields=name,email`)
    const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '';

    // Filtering (e.g., `?provider=CompanyA`)
    const filter = { ...req.query };
    delete filter.page;
    delete filter.limit;
    delete filter.sort;
    delete filter.fields;

    // Find contacts with pagination, sorting, field selection, and filtering
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(fields);

    // Check if contacts were found
    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    // Total count for pagination info
    const totalContacts = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalContacts / limit);

    return res.status(200).json({
      contacts,
      pagination: {
        totalContacts,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: `Error fetching contacts: ${error.message}` });
  }
};

//**--------------------------------------[Contact Form Controller]-------------------------------------- */
const contactForm = async (req, res) => { 
  try {
    const response  = req.body
    const newContact = await Contact.create(response)
    console.log(req.body);
    res.status(201).send({ message: "Contact Created Successfully", newContact })
  } catch (error) {
    // next(error)
    res.status(400).send({ message: `page not fount ${error} ` })
  }
}

//**--------------------------------------[Delete Contact Controller]-------------------------------------- */
const deleteContactByID = async (req, res, next) => {
  try {
    // Extract contact ID from request parameters
    //there is other method as well that we can use
    //! const id = req.params.id

    const { id } = req.params;

    // Attempt to delete the contact by ID
    const result = await Contact.deleteOne({ _id: id });

    // If no contact was deleted, respond with a 404 status and message
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact Not Found" });
    }

    // If deletion was successful, respond with a 200 status and success message
    res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    // Forward any error to the error-handling middleware
    next(error);
  }
};

module.exports = {contactForm,getAllContacts,deleteContactByID}  
