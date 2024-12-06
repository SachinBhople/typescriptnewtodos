import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
    title: string;
    description: string;
    hero: string,
    priority: string;
    skills: string[];
    taskType: string;
    isCompleted: boolean;
}

const todoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        hero: {
            type: String,
            // required: true,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
        },
        taskType: {
            type: String,
            enum: ['Bug', 'Feature',],
        },
        skills: {
            type: [String],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
