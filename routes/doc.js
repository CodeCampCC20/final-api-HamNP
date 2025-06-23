import express from "express";
//Controllers
import { createDocNote, deleteNote, getAllNotes, getMeDoc, getNoteByUserId, updateDoc, updateNote } from "../controllers/doctor.js";

//Middlewares
import { authCheck } from "../middlewares/auth.middleware.js";
import prisma from "../config/prisma.js";

const docRouter = express.Router()

//ENDPOINT http://localhost:8000





docRouter.get("/doctors/me",authCheck,getMeDoc)

docRouter.patch('/doctors/me',authCheck,updateDoc)

docRouter.post('/doctor-notes',authCheck,createDocNote)

docRouter.get('/doctor-notes/my-notes',authCheck,getAllNotes)

docRouter.get('/doctor-notes/user/:userId',authCheck,getNoteByUserId)

docRouter.patch('/doctor-notes/:id',authCheck,updateNote)

docRouter.delete('/doctor-notes/:id',authCheck,deleteNote)
  
    
  
  
  
  
  









    
    export default docRouter