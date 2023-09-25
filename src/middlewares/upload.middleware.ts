import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const UploadMiddleware = multer({ storage: memoryStorage });
