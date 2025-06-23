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

export const createRecord = async (req,res,next) => {
  try {
    const { type, value } = req.body;

    if (!type || !value) {
      createError(400, "Invalid input");
    }

    await prisma.healthRecord.create({
      data: {
        type,
        value,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: "Create Health Record Successfully" });
  } catch (error) {
    next(error);
  }
}


export async function getRecords(req, res, next) {
  try {
    const records = await prisma.healthRecord.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json({ records });
  } catch (error) {
    next(error);
  }
}

export async function getRecordById(req, res, next) {
  try {
    const { id } = req.params;

    const recordId = await prisma.healthRecord.findFirst({
      where: { id: Number(id) },
    });

    if (!recordId) {
      createError(400, "Record doesn't exist!!");
    }

    res.status(200).json({ recordId });
  } catch (error) {
    next(error);
  }
}

export async function updateRecord(req, res, next) {
  try {
    const { type, value } = req.body;
    const { id } = req.params;

    const isRecord = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isRecord) {
      createError(400, "Record doesn't exist!!");
    }

    const RecordUpdated = await prisma.healthRecord.update({
      where: {
        id: Number(id),
      },
      data: {
        type,
        value,
      },
    });

    res.status(200).json({ RecordUpdated });
  } catch (error) {
    next(error);
  }
}

export async function deletedRecord(req, res, next) {
  try {
    const { id } = req.params;

    const isRecord = await prisma.healthRecord.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isRecord) {
      createError(400, "Record doesn't exist!!");
    }
    await prisma.healthRecord.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Record deleted" });
  } catch (error) {
    next(error);
  }
}

export async function getNoteFromDoc(req, res, next) {
  try {
    const { id } = req.user;
    const isNoteExist = await prisma.doctorNote.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!isNoteExist) {
      createError(400, "Record doesn't exist");
    }
    const recordFromDoc = await prisma.doctorNote.findFirst({
      where: {
        userId: id,
      },
    });

    res.status(200).json({ records: recordFromDoc });
  } catch (error) {
    next(error);
  }
}




