import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerConfig: MulterOptions = {
  dest: './uploads/', // upload folder
  limits: {
    fileSize: 1000000 // 1 MB
  },
  fileFilter(req: any, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(new Error('Only JPEG and PNG images are allowed!'), false);
    }
    cb(null, true);
  }
};
