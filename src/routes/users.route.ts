import express from "express";
import { deletedUserById, editUserByID, getUser, getUserByID, insertUser } from "../controllers/users.controller";
 '../controllers/users.controller';

const router = express.Router();

router.get('/user', getUser);
router.get('/user/:id', getUserByID);

router.post('/insertuser' , insertUser);

router.put('/user/edit/:id' , editUserByID);
router.put('/user/delete/:id', deletedUserById)

export default router;