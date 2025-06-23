import express from "express";
//Controllers
import { getMe, updateUser } from "../controllers/user.js";
//Middlewares
import { authCheck } from "../middlewares/auth.middleware.js";
import prisma from "../config/prisma.js";

const router = express.Router()

//ENDPOINT http://localhost:8000





router.get("/users/me",authCheck,getMe)

router.patch('/users/me',authCheck,updateUser)
  
    
  
  
  
  
  









    
    export default router