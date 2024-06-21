import { Request , Response } from "express";
import  Room  from '../models/rooms.model'
import  Maintenance from '../models/maintenance.model'

export async function getQueue(req: Request, res: Response) {
    try {
        const queues = await Maintenance.find()
        .populate('room' , 'roomNumber floor size')
        .populate('requester' , 'name tel email');
        res.status(200).json(queues)
    } catch (error) {
        res.status(500).json({message : 'Failed to featch queues'})
    }
}

export async function insertQueue(req : Request, res : Response) {
    const files = req.files as Express.Multer.File[];
    const {maintenanceType , room , serviceStatus , requester} = req.body
    try {
        const imagePaths = files.map(file => file.path);
        const newQueue = new Maintenance({
            maintenanceType,
            room,
            serviceStatus,
            requester,
            imageURL : imagePaths,
        });
        await newQueue.save()
        res.status(201).json(newQueue)
    } catch (error) {
        res.status(400).json({message : 'Failed to create queue' , error})
    }
}

export async function updateQueueStatus(req : Request, res : Response) {
    const { id } = req.params
    const { status } = req.body
    try {
        const queue = await Maintenance.findByIdAndUpdate(id , {serviceStatus : status } , { new : true })
        if (!queue) {
            res.status(404).json({message : 'Queue not found'})
        }
        res.status(200).json(queue)
    } catch (error) {
        res.status(400).json({message : 'Failed to updated queue status' ,error})
    }
}

export async function searchQueue(req : Request, res : Response) {
    const { serviceStatus , roomNumber , userId , floor } = req.body
    const query: any = {};

    try {
        if (serviceStatus) query.serviceStatus = serviceStatus
        if (userId) query.requester = userId
        if (roomNumber) {
            const room = await Room.findOne({ roomNumber : Number(roomNumber)})
            if (!room) {
                res.status(404).json({message : 'Room not found'})
            }
            query.room = room
        }
        if (floor) {
            const findfloor = await Room.find({floor: Number(floor)})
            query.room = findfloor
        }
        const queue = await Maintenance.find(query)
        .populate('requester' , 'name tel email')
        .populate('room' , 'roomNumber floor size')
        if (queue.length === 0) {
            res.status(404).json({message : 'Queue not found'})
        } else {
            res.status(200).json(queue)
        }
    } catch (error) {
        res.status(500).json({message : 'Failed to fetch queue' , error})
    }
}

export async function deleteQueue(req : Request , res:Response) {
    const { id } = req.query
    try {
        const queue = await Maintenance.findByIdAndUpdate(id , { serviceStatus : "Cancel"} , { new : true })
        if (!queue) {
            res.status(404).json({message : 'Queue not found'})
        }
        res.status(200).json({message : 'Delete Queue Completed' , queue})
    } catch (error) {
        res.status(400).json({message : 'Failed to delete queue' , error})
    }
}




