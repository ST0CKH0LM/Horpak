import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imgUploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb:multer.FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null , true)
    } else {
        cb(new Error ('Image only'))
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 1024 * 1024 * 5 }
}); 