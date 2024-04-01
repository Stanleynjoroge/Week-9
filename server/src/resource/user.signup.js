

import express from 'express';
import { generateToken, hashPassword } from '../utils/auth.js';
import { checkSchema} from 'express-validator';
import { validateSchema } from '../middle_wares/middlware.data.js';
import { registrationSchema } from '../validators/user.validator.js';

const router = express.Router();

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

// Register user route
router.get( '/user', async(req, res) =>{

    try {
        const user = await prisma.user.findMany({
           select: {
               id: true,  
               username: true,  
               email:true 
            }
            
        });
        res.json(user);
        console.log(user)
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
   
})
router.post('/',checkSchema(registrationSchema), validateSchema, async (req, res) => {
    const data = req.data
    try {
        if (!data.username || !data.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Hash the password
        data.password = await hashPassword(data.password);

        // Check if the user already exists in the database
        const userExist = await prisma.user.findUnique({
            where: {
                email: data.email // Check for existing email only
            }
        });

        if (userExist) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create the new user
        const newUser = await prisma.user.create({
            data: data
            
        });

        // Generate token for the new user
        const token = generateToken(newUser);

        res.header('token', token).status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
    finally{
        await prisma.$disconnect()
    }   
})



export default router;
