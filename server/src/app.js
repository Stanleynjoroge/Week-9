import express from 'express'; 
import dotenv from 'dotenv';
import userRouter from './resource/user.signup.js';
import loginRouter from  './resource/user.login.js'
import { verifyToken } from './utils/auth.js';
import cookieParser from 'cookie-parser';
import protectedRoute from './middle_wares/protectedRoutes.js';
import session from 'express-session';
import projectRouter from './routes/route.project.js'
import ticketRouter from './routes/route.ticket.js'
import cors from 'cors';
dotenv.config();

const app = express(); 

app.use(express.json()); 
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
  };
  
  app.use(cors(corsOptions));
const port = process.env.PORT || 5000; 
app.get('/',(req, res)=>{
    res.send('pls work')
})
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,   // Set to true to send cookie only over HTTPS
        httpOnly: true  // Set to true to prevent client-side JavaScript access
    }
}));


app.use('/register', userRouter);
app.use('/login' ,loginRouter)
app.use('/project',projectRouter)
app.use('/ticket',ticketRouter )



app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
});
