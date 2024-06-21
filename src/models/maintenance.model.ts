import { Schema , model , Types } from "mongoose";

interface Maintenance {
    maintenanceType : string;
    room : Types.ObjectId;
    serviceStatus : string;
    requester : Types.ObjectId;
    imageURL : string[];
    createdAt : Date;   
    updatedAt : Date;
}

const maintenanceSchema = new Schema<Maintenance>({
    maintenanceType :  { type : String, required : true},
    room : { type : Schema.ObjectId, ref: 'Room',},
    serviceStatus : { type : String, required : true},
    requester : {type : Schema.ObjectId, ref : 'User'},
    imageURL : [{ type : String }]
},{
    timestamps: true
});

const maintenance = model<Maintenance>('Maintenance' , maintenanceSchema);

export default maintenance;