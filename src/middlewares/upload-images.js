module.exports = function makeUploadImages({
  multer,
  config,
}) {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.image.path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + "-" + Date.now() + ".png");
    },
  });
  let uploadImage = multer({
    storage: storage
  });

  return uploadImage;
};