


import asyncHandler from "../../utils/asyncHandler.js";
import customError from "../../utils/customError.js";
import Contact from "../../model/contacts/contact.js";



// Safe Regex Escape Helper
const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");


// LOGGED IN USER'S ALL CONTACTS
// GET ALL / SEARCH / FILTER / PAGINATE CONTACTS
export const getContact = asyncHandler(async (req, res) => {
    // 1. Destructure with default fallback values (Exact match with validator keys)
    const {
        search,
        category,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc"
    } = req.query;

    // 2. Base Query (Data Isolation)
    const query = { userId: req.user._id };
    
    // 3. Apply Regex Search across fields
    if (search && search.trim() !== "") {
        const safeSearch = escapeRegex(search.trim());
        query.$or = [
            { name: { $regex: safeSearch, $options: "i" } },
            { phone: { $regex: safeSearch, $options: "i" } },
            { email: { $regex: safeSearch, $options: "i" } }
        ];
    }

    // 4. Apply Category Filter
    if (category) {
        query.category = category;
    }

    // 5. Pagination & Dynamic Sort Setup
    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;
    const skip = (page - 1) * limit;

    // 6. Execute Parallel Queries
    const [contacts, totalContacts] = await Promise.all([
        Contact.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .select("-__v")
            .lean(),
        Contact.countDocuments(query)
    ]);

    // 7. Standardized API Response
    return res.status(200).json({
        success: true,
        message: contacts.length > 0 ? "✔ Contacts fetched successfully." : "⚠ No contact found.",
        pagination: {
            totalContacts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalContacts / limit),
            limit: Number(limit)
        },
        data: contacts
    });
});




// GET SINGLE CONTACT BY ID
export const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const contact = await Contact.findOne({ _id: id, userId: req.user._id })
        .select("-__v")
        .lean();

    if (!contact) {
        throw customError(404, "Contact not found");
    }

    return res.status(200).json({
        success: true,
        data: contact
    });
});


// POST METHOD 
// CREATE CONTACT
export const createContact = asyncHandler(async (req, res) => {
    const { name, phone, email, category } = req.body;

    // Create Contact
    const newContact = await Contact.create({
        name,
        phone,
        email,
        category,
        userId: req.user._id
    });

    // send response
    return res.status(201).json({
        success: true,
        message: `✔ Contact created successfully.`,
        data: newContact
    })

})



// UPDATE CONTACT BY ID 
// UPDATE METHOD 
export const updateContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, category } = req.body;


    // Validation id -> body
    const contact = await Contact.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { name, email, phone, category },
        { returnDocument: 'after', runValidators: true }
    ).select("-__v").lean();

    if (!contact) {
        throw customError(404, "Contact not found to update")
    }

    return res.status(200).json({ success: true, data: contact });
});






// DELETE CONTACT BY ID 
// DELETE METHOD 
export const deleteContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // ID validation middleware 

    // FETCH AND DELETE 
    const contact = await Contact.findOneAndDelete({
        _id: id,
        userId: req.user._id
    }).lean();

    if (!contact) {
        throw customError(404, "Contact not found to delete")
    }

    // SEND RESPONSE
    return res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
        data: contact._id
    })
}) 