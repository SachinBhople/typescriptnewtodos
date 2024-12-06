import express from "express"
import { loginUser, logoutUser, registerUser } from "../controller/auth.controller"

const authrouter = express.Router()

authrouter.post("/register", registerUser)
authrouter.post("/login", loginUser)
authrouter.post("/logout", logoutUser)

export default authrouter;
