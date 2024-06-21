import { Schema , model , Types } from "mongoose";

interface Room {
    roomNumber : number;
    floor : string;
    size : string;
    price : number;
    renter : Types.ObjectId | null;
    roomStatus : number;
    // dateOfStay : Date; wait for frontend //
    amenities : string[];
    createdAt : Date;
    updatedAt : Date;
}

const roomSchema = new Schema<Room>({
    roomNumber : {type : Number, required: true},
    floor : {type : String, required: true},
    size : {type : String, required: true},
    price : {type : Number, required: true},
    renter : {type : Schema.ObjectId, ref: 'User', default : null},
    roomStatus : {type : Number, required: true},
    amenities : {type : [String], required: true}
},{
    timestamps : true
})

const Room = model<Room>('Room', roomSchema)

export default Room;