import express from 'express';
import {
    getFeedPosts,
 userPosts
} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js';

const router=express.Router();

router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,userPosts);


export default router;