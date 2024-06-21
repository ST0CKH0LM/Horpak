import express from 'express';
import { editRoom, getRoom, getRoomByCustom, insertRoom, roomRent, unRoomRent } from '../controllers/rooms.controller'

const router = express.Router();

router.get('/room', getRoom)
router.get('/customsearchroom', getRoomByCustom)

router.post('/addroom' , insertRoom)
router.post('/editroom/:id', editRoom)
router.post('/renting' , roomRent)
router.post('/removerenting', unRoomRent)

export default router;