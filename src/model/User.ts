import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;

}

const userSchma: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("user", userSchma);

export default User;
