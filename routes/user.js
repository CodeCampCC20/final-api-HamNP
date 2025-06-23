import express from "express";
//Controllers
import { createRecord, deletedRecord, getMe, getRecordById, getRecords, updateRecord, updateUser } from "../controllers/user.js";
//Middlewares
import { authCheck } from "../middlewares/auth.middleware.js";
import prisma from "../config/prisma.js";

const router = express.Router()

//ENDPOINT http://localhost:8000





router.get('/users/me',authCheck,getMe)

router.patch('/users/me',authCheck,updateUser)

router.post('/health-records',authCheck,createRecord)

router.get('/health-records',authCheck,getRecords)

router.get('/health-records/:id',authCheck,getRecordById)

router.patch('/health-records/:id',authCheck,updateRecord)

router.delete('/health-records/:id',authCheck,deletedRecord)
  
    
  
  
  
  
  









    
    export default router