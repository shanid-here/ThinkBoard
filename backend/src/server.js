import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"


import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import auth from "./routes/auth.js"
import cookieParser from "cookie-parser"


dotenv.config()
// console.log(process.env.MONGO_URI);


const app = express();
const  PORT = process.env.PORT || 5001

const __dirname = path.resolve()


// middleware
if(process.env.NODE_ENV !=="production"){
    app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
}
app.use(express.json())
app.use(rateLimiter)

// app.use((req,res,next) => {
//     console.log(`Req Method is ${req.method} & Req URL is ${req.url}`);
    
// })
app.use(cookieParser())

app.use("/api/auth",auth)

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    
app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}


connectDB().then(() =>{
app.listen(PORT, ()=>{
    console.log("Server started on PORT:",PORT);   
})
})

