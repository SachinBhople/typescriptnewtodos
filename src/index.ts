import express, { Request, Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors"
import router from "./routes/todo.routes";
import authrouter from "./routes/auth.routes";
import cookieparser from "cookie-parser"
dotenv.config();
const app = express()
const MONGO_URL: string = process.env.MONGO_URL || ""
const PORT: number = parseInt(process.env.PORT || "5000", 10);

app.use(express.json())
app.use(cookieparser())
app.use(cors({ origin: true, credentials: true }))
app.use("/api", router)
app.use("/api/auth", authrouter)
app.get('/test', (req: Request, res: Response): void => {
    res.json({ data: "test page" });
});

mongoose.connect(MONGO_URL)



mongoose.connection.once("open", () => {
    console.log("MONGO DB CONNTECTED");
    app.listen(PORT, () => {
        console.log("server runinng");
    })
})
