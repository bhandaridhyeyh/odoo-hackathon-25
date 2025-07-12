import multer from 'multer';
import path from 'path';

// Save uploaded files temporarily to uploads/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log("📦 Saving file:", filename);
        cb(null, filename);
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, .png files are allowed!'));
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
