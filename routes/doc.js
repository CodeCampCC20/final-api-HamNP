import express from "express";
//Controllers
import { getMeDoc, updateDoc } from "../controllers/doctor.js";

//Middlewares
import { authCheck } from "../middlewares/auth.middleware.js";
import prisma from "../config/prisma.js";

const docRouter = express.Router()

//ENDPOINT http://localhost:8000





docRouter.get("/doctors/me",authCheck,getMeDoc)

docRouter.patch('/doctors/me',authCheck,updateDoc)
  
    
  
  
  
  
  









    
    export default docRouter