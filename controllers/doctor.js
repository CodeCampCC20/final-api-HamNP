import { createError } from "../utils/createError.js"
import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs";



export const getMeDoc = async (req,res,next) => {
  try {
    const {id} = req.user;
    console.log(id)
    const doctor = await prisma.doctor.findFirst({
      where:{
        id:Number(id)
      },
      omit:{
        password:true
      }
    })
    res.json({result:doctor})
  } catch (error) {
    next(error)
  }
}


export const updateDoc = async (req,res,next) => {
  try {
    //1. Read params & body
    const {id} = req.user;
    const {username,password,specialization} = req.body;
    console.log(id,username);
    const usernameCheck = await prisma.doctor.findFirst({
      where: {
        username:username
      },
    })
    if(usernameCheck){
      createError(400,"Username Already Exist!!")
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    //2. Update to DB
    const update = await prisma.doctor.update({
      where: {
        id:Number(id)
      },
      data:{
        username:username,
        password:hashPassword,
        specialization:specialization,
      },
      omit:{
        password:true
      }

    })

    res.json({
      message:`Update Doctor username Successfully`,
      update
    })
  } catch (error) {


    next(error)
  }
}





