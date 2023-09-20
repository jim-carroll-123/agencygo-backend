import multer from 'multer';
import path from 'path';

export const UploadMiddleware = multer({ dest: path.join(__dirname, '../../uploads') });
