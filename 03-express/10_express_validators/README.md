

**`express-validator`**

---

### WHAT (Express-Validator Kya Hai?)

`express-validator` ek Express-native middleware library hai jo backend HTTP requests (`req.body`, `req.params`, `req.query`)
ko sanitize aur validate karne ke liye **`validator.js`** internal library ka upayog karti hai.

---

### WHY (Humein Iski Zaroorat Kyun Hai?)

1. **Controller Isolation:** Validation logic aur business logic alag ho jate hain.
2. **Sanitization (Data Cleaning):** Fast String Trim karna, Email Normalize karna, ya XSS payloads saf karna.
3. **Chainable Rule Declaration:** Simple methods chaining (`.notEmpty().isEmail()`).

---




### HOW (Step-by-Step Implementation)




### 1. Updated Validators List (Input Checking)

| Method Name | Description | Example Usage |
| --- | --- | --- |
| **`.notEmpty()`** | Field empty, null, ya undefined nahi honi chahiye | `body('title').notEmpty()` |
| **`.isEmail()`** | Valid email format format check karta hai | `body('email').isEmail()` |
| **`.isLength({ min, max })`** | String ki length bounds define karta hai | `body('username').isLength({ min: 3, max: 20 })` |
| **`.isNumeric()`** | String ya Value strictly numbers/digits honi chahiye | `body('zip').isNumeric()` |
| **`.isFloat()`** | Decimal numbers allow karta hai (`min`, `max` options) | `body('amount').isFloat({ min: 1.0 })` |
| **`.isInt()`** | Strictly whole integer allow karta hai | `body('age').isInt({ min: 18 })` |
| **`.isAlpha()`** | Sirf Alphabets allow karta hai (A-Z, a-z) | `body('firstName').isAlpha()` |
| **`.isAlphanumeric()`** | Sirf Letters aur Numbers allow karta hai (No special chars) | `body('username').isAlphanumeric()` |
| **`.isURL()`** | Valid HTTP/HTTPS Web URL format check karta hai | `body('website').isURL()` |
| **`.isDate()` / `.isISO8601()**` | Standard ISO Date format check karta hai (`YYYY-MM-DD`) | `body('dob').isISO8601()` |
| **`.isIn([...])`** | Allowed Values ki List (Enum Validation) | `body('role').isIn(['admin', 'user'])` |
| **`.isStrongPassword()`** | Enforces Password Complexity (min 8 chars, uppercase, symbol, number) | `body('password').isStrongPassword()` |
| **`.isUppercase()`** | Pura text Uppercase hona chahiye | `body('code').isUppercase()` |
| **`.isLowercase()`** | Pura text Lowercase hona chahiye | `body('handle').isLowercase()` |
| **`.matches(regex)`** | Custom Regex Pattern match karne ke liye | `body('phone').matches(/^[0-9]{10}$/)` |
| **`.isMongoId()`** | Valid MongoDB 24-char Hex ObjectId check karta hai | `param('id').isMongoId()` |
| **`.isBoolean()`** | Only `true` or `false` allow karta hai | `body('isActive').isBoolean()` |

---

### 2. Updated Sanitizers List (Data Cleaning)

| Method Name | Description | Transformation Example |
| --- | --- | --- |
| **`.trim()`** | Leading aur trailing whitespaces remove karta hai | `"  mehtab  "` ➔ `"mehtab"` |
| **`.escape()`** | HTML characters ko escape karke XSS attacks block karta hai | `"<script>"` ➔ `"&lt;script&gt;"` |
| **`.normalizeEmail()`** | Email ko lowercase karta hai aur dots/aliases clean karta hai | `"User.Name@Gmail.com"` ➔ `"username@gmail.com"` |
| **`.lowercase()`** | Puri string ko lowercase me convert kar deta hai | `"FOOD"` ➔ `"food"` |
| **`.uppercase()`** | Puri string ko uppercase me convert kar deta hai | `"inr"` ➔ `"INR"` |
| **`.toInt()`** | Input string ko JavaScript Integer Number me badalta hai | `"100"` ➔ `100` |
| **`.toFloat()`** | Input string ko Float Number me badalta hai | `"49.99"` ➔ `49.99` |
| **`.toBoolean()`** | Input string ko Boolean type me cast karta hai | `"true"` ➔ `true` |
| **`.blacklist(chars)`** | String me se specific unwanted characters remove karta hai | `blacklist(str, '\\[\\]')` |

---

### Industry Pattern Example (Password & Profile Validation)

```javascript
import { body } from 'express-validator';

export const registerUserValidationRules = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers')
        .isLength({ min: 4, max: 15 }).withMessage('Username length must be 4-15 chars'),

    body('email')
        .trim()
        .normalizeEmail() // Sanitizer
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage('Password must be 8+ chars with uppercase, lowercase, number & symbol')
];

```



#### Step 1: Package Install Karo

```bash
npm install express-validator

```





#### Step 2: Validation Rules Chain Define Karo (`src/validators/expenseValidationRules.js`)

Aap request body ki fields par rules ki array create karte ho:

```javascript
import { body } from 'express-validator';

export const createExpenseValidationRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 50 }).withMessage('Title must be 3 to 50 characters long'),
        
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a valid number')
        .custom(value => value > 0).withMessage('Amount must be greater than 0'),
        
    body('category')
        .trim()
        .notEmpty().withMessage('Category is required')
        .isIn(["Food", "Travel", "Bills", "Shopping", "Entertainment", "Other"])
        .withMessage('Invalid Category selected'),
        
    body('paymentMethod')
        .optional()
        .isIn(["UPI", "Credit Card", "Debit Card", "Cash"])
        .withMessage('Invalid Payment Method'),
        
    body('isRecurring')
        .optional()
        .isBoolean().withMessage('isRecurring must be true or false')
];

```

#### Step 3: Central Errors Handling Middleware (`src/middleware/validateRequest.js`)

Rules sirf errors identify karke `req` object me append karte hain. Unhe extract karke response throw karne ke liye ek middleware banana hota hai:

```javascript
import { validationResult } from 'express-validator';
import customError from '../utils/customError.js';

export const validateRequest = (req, res, next) => {
    // 1. Validation errors collect karo
    const errors = validationResult(req);

    // 2. Agar array empty nahi hai, toh error hai
    if (!errors.isEmpty()) {
        // Pehle error ka message extract karke Central Error Handler me bhej do
        const firstErrorMessage = errors.array()[0].msg;
        throw customError(400, firstErrorMessage);
    }

    // 3. Sab clear hai toh controller par jao
    next();
};

```

---

### STANDARD INDUSTRY IMPLEMENTATION (Route Placement)

Express routes me validation array aur custom error handler ko controller function se PEHLE place kiya jata hai:

`src/routes/expenseRoutes.js`

```javascript
import express from 'express';
import { createExpense } from '../controller/expense_Controller/expensesController.js';
import { createExpenseValidationRules } from '../validators/expenseValidationRules.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Execution Order: Auth Check -> Apply Rules -> Check Errors -> Run Controller
router.post(
    '/',
    isAuthenticated,
    createExpenseValidationRules, // Array of rules
    validateRequest,               // Error checker middleware
    createExpense                  // Controller
);

export default router;

```

---

### Cleaned Controller Result

Ab `createExpense` controller me se Manual validation completely gayab ho jayegi:

```javascript
// Before: Manual checks needed ❌
// if (!title || !amount) throw customError(400, "Required");

// After: Clean & Pure Business Logic ✅
export const createExpense = asyncHandler(async (req, res) => {
    const { title, amount, category, paymentMethod, isRecurring } = req.body;

    const expense = await Expense.create({
        title,
        amount,
        category,
        paymentMethod,
        isRecurring,
        userId: req.user._id
    });

    return res.status(201).json({
        success: true,
        message: "✔ Expense logged successfully",
        data: expense
    });
});

```

Isey apne code mein integrate karke Postman par testing karke dekho! 
Jab express-validator ki logic clear ho jaye, tab batana—phir dikhaunga ki **Zod** isse 10x powerful aur simple kaise banata hai.
