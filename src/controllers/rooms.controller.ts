import { Request, Response } from "express";
import Room from '../models/rooms.model';
import User from '../models/users.model';

export async function getRoom(req: Request , res : Response){
    try {
        const rooms = await Room.find().populate('renter', 'name tel email');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({message : 'Failed to fetch rooms' , error})
    }
};

export async function insertRoom(req: Request, res: Response){
    try {
        const newRoom = new Room(req.body);
        const findrooms = Room.findOne({ roomNumber : newRoom.roomNumber})
        const room = await findrooms.exec();
        if (room != null) {
            res.status(403).json({message : 'Room number already exist'})
            return
        } else {
            await newRoom.save()
            res.status(201).json(newRoom)
        }
    } catch (error) {
        res.status(400).json({message : 'Failed to create room' , error})
    }
};

export async function editRoom(req: Request, res: Response){
    const { id } = req.params
    try {
        const room = await Room.findByIdAndUpdate(id, req.body, { new : true});
        if (!room) {
            res.status(404).json({message : 'User not found'});
        } else {
            res.status(200).json(room)
        }
    } catch (error) {
        res.status(400).json({message : 'Failed to updated room' , error});
    }
}

export async function roomRent(req: Request, res:Response){
    const { userId , roomId } = req.body
    try {
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);
        if (!room) {
            res.status(404).json({message : 'Room not found'})
            return
        }
        if (!user) {
            res.status(404).json({message : 'User not found'})
            return
        }
        if (room.renter != null) {
            res.status(200).json({message : 'Room already rented'})
            return
        }
        room.renter = user._id
        user.roomRent = room._id
        await room.save();
        await user.save();
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ message : 'Error renting room' , error});
    }
};

export async function unRoomRent(req: Request, res : Response){
    const  { roomId }  = req.body
    try {
        const room = await Room.findById(roomId)
        if (!room) {
            res.status(404).json({message : 'Room not found'})
            return;
        }
        room.renter = null;
        await room.save();
        res.status(200).json({message : 'Remove succesfully ' , room});
    } catch (error) {
        res.status(400).json({message : 'Error remove renting room', error})
    }
}

export async function getRoomByCustom(req: Request, res:Response){
    const { floor , size , price , amenities } = req.body;
    const { renter } = req.query
    const query: any = {};

    if (renter === 'false') query.renter = null;
    if (floor) query.floor = floor;
    if (size) query.size = size;
    if (price) query.price = {$lte : price};
    if (amenities) query.amenities = { $all : amenities.spite(',') }; 
    try {
        const room = await Room.find(query).populate( 'renter' , 'name tel email status')
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({message : 'Failed to fetch users', error})
    }
};