const multer = require('multer');
const express = require('express');
const path = require('path');

const imageMiddleware = (app) => {
  const storage = multer.diskStorage({
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
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use('/images', express.static(path.join(__dirname, '..', 'images')));
};

module.exports = imageMiddleware;
