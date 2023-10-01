import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import {register} from './controllers/auth.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { verifyToken } from './middleware/auth.js';
import { 
createPost
} from './controllers/posts.js';
import postRoutes from './routes/postRoutes.js'
import helmet from 'helmet';
//CONFIGURATIONS
const __fileName=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__fileName);

dotenv.config();
const app=express();
app.use(cors());

app.use(bodyParser.json({limit:"50mb",extended:true}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));





//setting directory where we keep our assest/images uploaded
app.use("/assets",express.static(path.join(__dirname,'pubic/assets')));

//multer's github readme or npm docs
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
        
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload =multer({storage});

//ROUTES WITH FILES 
app.post("/auth/register",upload.single('picture'),register);
app.post("/posts",verifyToken,upload.single("picture"),createPost);

//ROUTES
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes);

//MONGOOSE SETUP

const PORT=process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`server listening on the port ${PORT}`))
}).catch((error)=>console.log(`${error} did not connect`));