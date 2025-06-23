import { createError } from "../utils/createError.js"
import prisma from "../config/prisma.js"
import bcrypt from "bcryptjs";

export const getMe = async (req,res,next) => {
  try {
    const {id} = req.user;
    console.log(id)
    const user = await prisma.user.findFirst({
      where:{
        id:Number(id)
      },
      omit:{
        password:true
      }
    })
    res.json({result:user})
  } catch (error) {
    next(error)
  }
}


export const updateUser = async (req,res,next) => {
  try {
    //1. Read params & body
    const {id} = req.user;
    const {username,password} = req.body;
    console.log(id,username,password);
    const usernameCheck = await prisma.user.findFirst({
      where: {
        username:username
      },
    })
    if(usernameCheck){
      createError(400,"Username Already Exist!!")
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    //2. Update to DB
    const update = await prisma.user.update({
      where: {
        id:Number(id)
      },
      data:{
        username:username,
        password:hashPassword

      },
      omit:{
        password:true
      }

    })

    res.json({
      message:`Update User username Successfully`,
      update
    })
  } catch (error) {
    next(error)
  }
}






