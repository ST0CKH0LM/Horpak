import express from "express";
import { 
    deleteNotification,
    getNotification, 
    insertNotification, 
    updateNotification 
} from "../controllers/notification.controller";

const router = express.Router();

router.post('/insertnotification' , insertNotification)
router.post('/deletenotification' , deleteNotification)
router.post('/updatenotification' , updateNotification)

router.get('/getnotification' , getNotification)

export default router