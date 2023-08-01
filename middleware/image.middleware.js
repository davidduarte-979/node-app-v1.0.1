import multer, { diskStorage } from 'multer';
import { static as staticExpress } from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imageMiddleware = (app) => {
  const storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  app.use(multer({ storage, fileFilter }).single('image'));
  app.use(staticExpress(join(__dirname, '..', 'public')));
  app.use('/images', staticExpress(join(__dirname, '..', 'images')));
};

export default imageMiddleware;
