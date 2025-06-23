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

export async function createDocNote(req, res, next) {
  try {
    const { userId, note } = req.body;

    const isUser = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!isUser) {
      createError(400, "User does not exist!!");
    }

    console.log(req.user);

    await prisma.doctorNote.create({
      data: {
        userId: isUser.id,
        note,
        doctorId: req.user.id,
      },
    });

    res.status(201).json({ message: "create doctor notes successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getAllNotes(req, res, next) {
  try {
    const records = await prisma.doctorNote.findMany({
      where: { doctorId: req.user.id },
    });

    res.status(200).json({ records });
  } catch (error) {
    next(error);
  }
}

export async function getNoteByUserId(req, res, next) {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const NotesById = await prisma.doctorNote.findMany({
      where: { doctorId: id, userId: Number(userId) },
    });

    res.status(200).json({ records: NotesById });
  } catch (error) {
    next(error);
  }
}

export async function updateNote(req, res, next) {
  try {
    const { id } = req.params;
    const doctorId = req.user.id;
    const { note } = req.body;

    const isNote = await prisma.doctorNote.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isNote) {
      createError(400, "Note doesn't exist!!");
    }

    const NoteUpdated = await prisma.doctorNote.update({
      where: {
        doctorId,
        id: Number(id),
      },
      data: {
        note,
      },
    });

    res.status(200).json({ NoteUpdated });
  } catch (error) {
    next(error);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    const isNote = await prisma.doctorNote.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isNote) {
      createError(400, "Note doesn't exist!!");
    }

    await prisma.doctorNote.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
}



