

import multer, { StorageEngine } from 'multer';

import path from "path"

const projectStorage: StorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})

const projectUpload = multer({ storage: projectStorage }).single("hero")


export default projectUpload 