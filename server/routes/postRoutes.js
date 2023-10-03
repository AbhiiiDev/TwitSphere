import express from 'express';
import {
    getFeedPosts,
 userPosts
} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js';
import { likePost } from '../controllers/posts.js';
const router=express.Router();

router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,userPosts);

router.patch("/:id/like", verifyToken, likePost);


export default router;