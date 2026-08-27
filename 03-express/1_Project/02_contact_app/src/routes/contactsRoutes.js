



import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js'
import { createContact, deleteContactById, getContact, getContactById, updateContactById } from '../controllers/contactsController/contactController.js';
import { createContactValidationRules, deleteContactValidationRules, getContactsValidationRules, getContactValidationRules, updateContactValidationRules } from '../middleware/contactValidation.js';


// Create router wrapper  / app
const router = express.Router();


// Must logged in
router.use(isAuthenticated)


// Routes
router.route("/contacts")
        .get(getContactsValidationRules,getContact)
        .post(createContactValidationRules, createContact)


router.route("/contact/:id")
        .get(getContactValidationRules,getContactById)
        .patch(updateContactValidationRules, updateContactById)
        .delete(deleteContactValidationRules, deleteContactById)
export default router;
