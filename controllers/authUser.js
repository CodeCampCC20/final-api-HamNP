import prisma from "../config/prisma.js"
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {

    //1. check body

    console.log(req.body)
    const { username, password } = req.body;

    // Step 2 Check username in DB
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    })

    console.log(user)

    if (user) {
      createError(400, "Username already exist!!!")
    }

    // Step 3 Encrypt Password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword)

    // Step 4 Save to DB

    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword
      }
    })


    res.json({ message: `Register User Successfully` })

  } catch (error) {
    next(error)

  }


}

export const loginUser = async (req, res, next) => {
  try {

    //Step 2 Check body

    const { username, password } = req.body;

    //Step 3 Check Username

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      }
    })
    console.log(username)
    if (!username) {
      createError(400, "Username or Password is Invalid!!!")
    }

    // Step 4 Check password

    const checkPassword = bcrypt.compareSync(password, user.password)

    if (!checkPassword) {
      createError(400, "Username or Password is Invalid!!!")
    }

    //Step 5 Generate Token
    const payload = {
      id: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });

    res.json({
      message: `Welcome back ${user.username}`,
      username: username,
      payload: payload,
      token: token,
    })
  } catch (error) {
    next(error)
  }

}