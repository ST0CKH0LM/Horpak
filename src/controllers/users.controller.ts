import { Request, Response } from "express";
import User from '../models/users.model';
import hashPassword from '../middlewares/hashpassword';

export async function insertUser(req: Request, res : Response){
    try {
        const newUser = new User(req.body);
        newUser.password = await hashPassword(newUser.password)
        newUser.status = 1
        await newUser.save()
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message : 'Failed to create user' , error});
    }
};

export async function getUser(req: Request, res : Response){
    try {
        const users = await User.find().populate('roomRent', 'roomNumber floor size');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message : 'Failed to fetch users' , error})
    }
};

export async function getUserByID(req: Request, res : Response){
    const { id } = req.params
    try {
        const users = await User.findById(id)
        if (!users) {
            res.status(404).json({message : 'User not found'});
        } else {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(404).json({message : 'Invalid ID' , error})
    }
};

export async function editUserByID(req: Request, res : Response){
    const { id } = req.params
    try {
        const users = await User.findByIdAndUpdate(id, req.body, { new : true });
        if (!users) {
            res.status(404).json({message : 'User not found'});
        } else {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(400).json({message : 'Failed to updated user' , error });
    }
}

export async function deletedUserById(req: Request, res : Response){
    const { id } = req.params
    try {
        const users = await User.findByIdAndUpdate(id, { status : "0"})
        if (!users) {
            res.status(404).json({message : 'User not found'});
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message : 'Failed to updated user' , error});
    }
}