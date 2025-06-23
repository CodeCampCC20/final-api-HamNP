import express from "express";

import { registerUser, loginUser } from "../controllers/authUser.js";
import { loginSchema, registerSchema, validate } from "../validations/validator.js";
import { loginDoctor, registerDoctor } from "../controllers/authDoctor.js";


const router = express.Router()



router.post('/register/user', validate(registerSchema), registerUser);
router.post("/login/user", validate(loginSchema), loginUser);

router.post('/register/doctor', validate(registerSchema), registerDoctor);
router.post("/login/doctor", validate(loginSchema), loginDoctor);


export default router