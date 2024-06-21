import { Schema, model, Types } from 'mongoose';

interface User {
    name: string;
    age: number;
    tel: number;
    parentTel: number;
    mainAddress : string;
    email : string;
    password : string;
    status : number;
    roomRent : Types.ObjectId | null;
    createdAt : Date;
    updatedAt : Date;
}

const userSchema = new Schema<User>({
    name: {type : String, required: true},
    age: {type: Number, required: true},
    tel: {type: Number, required: true},
    parentTel: {type : Number, required: false},
    mainAddress: {type : String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: Number, required: true},
    roomRent:  {type : Schema.ObjectId, ref: 'Room', default : null}
},{
    timestamps: true
});

const User = model<User>('User', userSchema);

export default User;