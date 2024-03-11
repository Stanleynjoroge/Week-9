
// Define login schema validation schema
export const loginSchema = {
    username: {
        notEmpty: true,
        isLength: {
            options: { min: 3, max: 16 },
            errorMessage: "Username must be between 3 and 16 characters"
        },
        matches: {
            options: /^[a-zA-Z0-9]+$/,
            errorMessage: "Username can only contain letters and numbers"
        }
    },
    password: {
        notEmpty: true,
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: "Password must have at least 6 characters and no more than 30"
        }
    },
    email: {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid email address"
        },
        custom: {
            options: (value) => {
                if (value !== value.toLowerCase()) {
                    throw new Error('Email must be lowercase');
                }
                return true;
            }
        }
    }
};


// Define regretions validation schema
export const registrationSchema = {
    username: {
        notEmpty: true,
        isLength: {
            options: { min: 3, max: 16 },
            errorMessage: "Username must be between 3 and 16 characters"
        },
        matches: {
            options: /^[a-zA-Z0-9]+$/,
            errorMessage: "Username can only contain letters and numbers"
        }
    },
    password: {
        notEmpty: true,
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: "Password must have at least 6 characters and no more than 30"
        }
    },
    email: {
        notEmpty: true,
        isEmail: {
            errorMessage: "Invalid email address"
        }
    },
    role:{
        isString: true,
        
    }
};

