


import asyncHandler from "../../utils/asyncHandler.js";
import customError from "../../utils/customError.js";
import Contact from "../../model/contacts/contact.js";





// LOGGED IN USER'S ALL CONTACTS
// GET METHODS
export const getContact = asyncHandler(async (req, res) => {
    // FETCH CONTACTS
    const contacts = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
    // SEND RESPONSE
    return res.status(200).json({
        success: true,
        message: contacts.length > 0 ?
            `✔ ${contacts.length} items found successfully.` : "⚠ No contact found.",
        count: contacts.length,
        data: contacts
    })

})


// FILTERING / SEARCHING CONTACTS




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


    // Validation id -> body
    const contact = await Contact.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        req.body,
        { new:true, runValidators: true }
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