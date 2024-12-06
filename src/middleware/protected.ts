import { Request, Response, NextFunction } from "express";
import { VerifyErrors } from "jsonwebtoken";

const jwt = require("jsonwebtoken")

interface CustomRequest extends Request {
    user?: string; // Add 'user' to the Request type
}

export const userProtected = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const { user } = req.cookies
    console.log("admin Protected", user)

    if (!user) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    jwt.verify(user, process.env.JWT_SECRET as string, (error: VerifyErrors | null, decoded: any) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decoded.userID


        next()
    })
}