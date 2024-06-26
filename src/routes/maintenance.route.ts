import express from "express";
import { deleteQueue, getHistory, getQueue, insertQueue, searchQueue, updateQueueStatus } from '../controllers/maintenance.controller'
import { upload } from '../config/multer.config'

const router = express.Router();

router.get('/queue' , getQueue);
router.get('/search' , searchQueue)
router.get('/history' , getHistory)

router.post('/insertqueue' , upload.array('imageURL' , 5) , insertQueue);
router.post('/updatestatus/:id' , updateQueueStatus)
router.post('/delete' , deleteQueue)

export default router