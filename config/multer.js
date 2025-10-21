const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');


const uploadsDir = 'uploads/avatars/';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Можно загружать только изображения!'), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
});

module.exports = upload;