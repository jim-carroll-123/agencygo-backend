import multer from 'multer';

export const UploadMiddleware = multer({ dest: 'uploads/' });
