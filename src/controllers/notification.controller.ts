import { Request , Response  } from "express";
import Notification from "../models/notification.model";
import User from "../models/users.model";
import { cancelScheduleNotification, scheduleNotification } from "../middlewares/schedule";

export async function getNotification(req : Request , res : Response) {
    try {
        const fNotification = await Notification.find()
        .populate({
            path : 'user',
            populate : {
                path : 'roomRent',
                model : 'Room',
                select : 'roomNumber floor'
            },
            select : 'name tel'
        });
        res.status(200).json({message : `Find ${fNotification.length} Complete` , fNotification})
    } catch (error) {
        res.status(400).json({message : 'Failed to fetch notification'})
    }
}

export async function insertNotification(req : Request , res : Response) {
    const {message, scheduleAt } = req.body
    try {
        const fUser = await User.find({})
        const Noti = [];
        for (const user of fUser) {
            const newNoti = new Notification({ 
                user : user._id,
                contentNoti : message,
                publish : false,
                status : 1,
                scheduleAt,
            })
            await newNoti.save()
            if (scheduleAt) {
                scheduleNotification(newNoti.id.toString(), new Date(scheduleAt) , () => {
                    newNoti.publish = true
                    console.log(`Sending notification to ${user.name} successfully`)
                    newNoti.save()
                })
            }
            Noti.push(newNoti)
        }
        res.status(201).json({message : `Add ${Noti.length} notification completed` , Noti})
    } catch (error) {
        res.status(400).json({message : 'Failed to add notification', error})
    }
}

export async function deleteNotification(req : Request , res : Response) {
    const { id } = req.query
    try {
        const fNotification = await Notification.findByIdAndUpdate(id , {status : 0} , {new : true})
        if (!fNotification) {
            res.status(404).json({message : 'Notification not found'})
            return
        }
        await fNotification.save()
        res.status(200).json({message : 'Deleted notification succesfully' , fNotification})
    } catch (error) {
        res.status(400).json(error)
    }
}

export async function updateNotification(req : Request , res : Response) {
    const { id } = req.query
    const { message , scheduleAt } = req.body
    try {
        const fNotification = await Notification.findByIdAndUpdate(
            id,
            { message , scheduleAt},
            { new : true , runValidators : true}
        )
        if (!fNotification || !id) {
            res.status(404).json({message : 'Notification not found'})
            return
        }
        cancelScheduleNotification(fNotification.id)
        scheduleNotification(fNotification.id, new Date(scheduleAt) , async () => {
        fNotification.publish = true
        fNotification.save()
        const fUser = await User.findById(fNotification.user)
        if (!fUser) {
            res.status(404).json({message : 'User not found'})
            return
        }
        console.log(`edit and sending notification to ${fUser.name} complete`)
        })
        res.status(200).json({message : `Update Successfully` , fNotification})
    } catch (error) {
        res.status(400).json(error)
    }
}