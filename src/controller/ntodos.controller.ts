import { Request, Response } from "express"
import Todo from "../model/Todo"
import asyncHandler from "express-async-handler"
import projectUpload from "../utils/upload"
import cloudinary from "../utils/cloudanary.config"
import { todoSchma } from "../middleware/authValidation"
import path from "path"
import { log } from "util"



export const getallTodos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await Todo.find()
    res.json({ message: "todo fetch succes", result })
})
export const addTodos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    projectUpload(req, res, async err => {
        if (err) {
            console.log(err.meesage);
            return res.status(400).json({ message: "Multer Error" })
        }

        const data = req.body;


        if (typeof data.skills === 'string') {
            data.skills = JSON.parse(data.skills);
        }


        if (typeof data.isCompleted === 'string') {
            data.isCompleted = data.isCompleted === 'true';
        }

        const parsedData = todoSchma.parse(data);


        const { isCompleted, description, title, message, skills, taskType, priority } = parsedData




        if (!req.file) {
            return res.status(400).json({ message: "Hero Image Is Required" })
        }



        let images
        if (req.file) {
            cloudinary.uploader.upload(req.file.path,)
                .then(async ({ secure_url }) => {
                    console.log(secure_url, "secure_url");
                    images = secure_url;
                    await Todo.create({ isCompleted, description, title, hero: images, message, skills, taskType, priority })

                    res.json({ message: "todo create  succes" })
                })
                .catch(error => {
                    console.error("Error uploading to Cloudinary:", error);
                    return res.status(500).json("Error uploading file.");
                });

        } else {
            await Todo.create({ isCompleted, description, title, message, skills, taskType, priority })

        }

    })
})



export const deleteTodos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    projectUpload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "Multer Error" });
        }

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Todo ID is required" });
        }

        const result = await Todo.findById(id);

        if (!result) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (result.hero) {
            cloudinary.uploader.destroy(path.basename(result.hero))
                .then(() => {
                    console.log("Hero image deleted successfully.");
                })
                .catch(error => {
                    console.error("Error deleting hero image:", error);
                });
        }


        await Todo.findByIdAndDelete(id);
        res.json({ message: "Todo deleted successfully" });
    });
});

export const updateTodos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    projectUpload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "Multer Error" })
        }
        console.log(req.body, "DDDD");
        const data = req.body;
        if (typeof data.skills === 'string') {
            data.skills = JSON.parse(data.skills);
        }


        if (typeof data.isCompleted === 'string') {
            data.isCompleted = data.isCompleted === 'true';
        }


        const parsedData = todoSchma.parse(data);
        const { isCompleted, description, title, message, skills, taskType, priority } = parsedData

        const { id } = req.params
        const result = await Todo.findById(id)
        if (!result) {
            return res.status(404).json({ message: "Todo not found" });
        }
        console.log(req.file);
        // if (req.file) {
        //     const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        //     await Todo.findByIdAndUpdate(id, { isCompleted, description, hero: secure_url, title, message, skills, taskType, priority })
        // } else {
        //     await Todo.findByIdAndUpdate(id, { isCompleted, description, title, message, skills, taskType, priority })
        // }
        let hero
        if (req.file) {
            cloudinary.uploader.upload(req.file.path)
                .then(async ({ secure_url }) => {
                    hero = secure_url
                    await Todo.findByIdAndUpdate(id, { title, description, isCompleted, priority, skills, taskType, message, hero })
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send("Error uploading file.");
                });
        } else {
            await Todo.findByIdAndUpdate(id, { title, description, isCompleted, priority, skills, taskType, message })
        }

        res.json({ message: "todo Update  succes" })
    })
})


