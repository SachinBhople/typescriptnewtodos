import express from "express"
import { addTodos, deleteTodos, getallTodos, updateTodos } from "../controller/ntodos.controller"
import { userProtected } from "../middleware/protected"

const router = express.Router()

router.get("/", getallTodos)
router.post("/add-todos", addTodos)
router.put("/update-todo/:id", updateTodos)
router.delete("/delete-todo/:id", deleteTodos)

export default router;
