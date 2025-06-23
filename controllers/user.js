import { createError } from "../utils/createError.js"
import prisma from "../config/prisma.js"

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
    console.log(id,username);
    //2. Update to DB
    const update = await prisma.user.update({
      where: {
        id:Number(id)
      },
      data:{
        username:username,
        password:password
      },
      omit:{
        password:true
      }

    })

    res.json({
      message:`Update User name Successfully`,
      update
    })
  } catch (error) {
    next(error)
  }
}






