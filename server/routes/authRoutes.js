import express, { Router } from 'express';
import {login} from '../controllers/auth.js'

const router=express.Router();//allows express to create routes in separate folder 
router.post("/loginUser",login);

export default router;