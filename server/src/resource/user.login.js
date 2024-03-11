import express from 'express';
import { generateToken,comparePassword} from '../utils/auth.js';
import {PrismaClient} from '@prisma/client';
import { loginSchema } from '../validators/user.validator.js';
import { checkSchema } from 'express-validator';
import { validateSchema } from '../middle_wares/middlware.data.js';
const router = express.Router();
const prisma = new PrismaClient();


router.post('/', checkSchema(loginSchema), validateSchema, async(req,res)=>{
    const data = req.formdata
    try {
        if (!data.username || !data.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const loginUser= await prisma.user.findUnique({
            where:
            {username: data.username}
        });
        if(!loginUser){
            throw new Error("User not found");
        }

        const isValid = await comparePassword(data.password, loginUser.password);
        console.log(isValid);
     if (!isValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

            // Generate JWT token for user.Remember tokens are stored in sessions using cookies👌🍪 
            const token = await generateToken(loginUser);
             res.cookie('valid_token', token)
            // Return token and user details
            res.status(200).json({token,loginUser});
            console.log('Login successful:'+loginUser.username);//try sending 'Nganga' '123456' 😊
      
    } catch (error) {
        console.log('Error in GET /src/user.login.js');
        console.error(error);
        return res.status(500).json({message:'Internal Server Error'});
    }finally{
        await  prisma.$disconnect();// this is to help prisma disconnect peacefully🤣🤣🤣
    }
})
export default router;