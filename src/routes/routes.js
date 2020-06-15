module.exports = (app) => {
  const CONTROLLER = require("../controller/controller");
  var multer = require("multer");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });
  app.get("/get", CONTROLLER.getAllUser);
  app.post("/details", CONTROLLER.createAccount);
  app.post("/login", CONTROLLER.login);
  app.post("/image", upload.single("filePath"), (req, res, next) => {
    res.send({
      type: "get",
      url: "http://localhost:3000/" + req.file.path,
    });
  });
};
