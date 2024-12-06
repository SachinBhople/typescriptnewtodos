import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerSchema, loginSchema } from '../middleware/authValidation';
import User from '../model/User';



export const registerUser = (async (req: Request, res: Response): Promise<any> => {
    const parsedData = registerSchema.parse(req.body);
    const { email, name, password } = parsedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({ email, name, password: hashedPassword });

    return res.status(201).json({ message: 'User registered successfully' });

})

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsedData = loginSchema.parse(req.body);


        const { email, password } = parsedData;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log(isMatch);

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.cookie('user', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return res.status(200).json({ message: 'Login successful', result: user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid input' });
    }
};


export const logoutUser = async (req: Request, res: Response): Promise<any> => {
    try {
        res.clearCookie("user")
        return res.status(200).json({ message: 'User Logout successful' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'logout user Failed' });
    }
};