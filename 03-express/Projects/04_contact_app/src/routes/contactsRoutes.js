



import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js'
import { createContact, deleteContactById, getContact } from '../controllers/contactsController/contactController.js';
import { createContactValidationRules, deleteContactValidationRules } from '../middleware/contactValidation.js';


// Create router wrapper  / app
const router = express.Router();


// Must logged in
router.use(isAuthenticated)


// Routes
router.route("/contacts")
        .get(getContact)
        .post(createContactValidationRules, createContact)


router.route("/contact/:id")
        .delete(deleteContactValidationRules, deleteContactById)
export default router;
