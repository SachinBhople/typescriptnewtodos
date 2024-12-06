import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});


export const todoSchma = z.object({
    description: z.string(),
    title: z.string(),
    // hero: z.string(),
    message: z.string(),
    skills: z.array(z.string()),
    taskType: z.string(),
    priority: z.string(),
    isCompleted: z.boolean(),
})