import { validationResult, matchedData } from "express-validator";

// Middleware to validate user input against registration schema and lowercase email
export const validateSchema = (req, res, next) => {
    // Convert email to lowercase if it exists in the request body
    // if (data.email) {
    //     req.body.email = req.body.email.toLowerCase();
    // }

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }
    
    req.data = matchedData(req)
    req.data.email = req.data.email.toLowerCase();
    next();
};