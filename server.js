import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import error from "./utils/error.js";
import { notFound } from "./utils/notfound.js";

const app = express()


app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json()); 

app.use('/api',userRouter)
app.use('/auth',authRouter)

app.use(error)
app.use(notFound)

const PORT = 8000
app.listen(8000,()=>console.log(`Server is running on port ${PORT}`))