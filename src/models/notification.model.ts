import { Schema , model , Document, Types } from "mongoose";

interface Notification extends Document {
    user : Types.ObjectId;
    contentNoti : string;
    publish : boolean;
    status : Number;
    scheduleAt : Date;
    createdAt : Date;
    updatedAt : Date;
}

const notificationSchema = new Schema<Notification>({
    user : {type : Schema.ObjectId, ref : 'User'},
    contentNoti : {type : String , required : true},
    publish : {type : Boolean, required : false},
    status : {type : Number, required : true},
    scheduleAt : {type : Date , required : false},
},{
    timestamps: true
});

const notification = model<Notification>('Notification' , notificationSchema);

export default notification;