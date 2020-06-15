const SERVICE = require("../service/service");
const VERIFY = require("../utility/verifyToken");
var bcrypt = require("bcrypt");
var response = {};
exports.createAccount = (req, res) => {
  try {
    req.checkBody("NAME").exists();
    req.checkBody("PASSWORD").exists();
    req.checkBody("EMAIL_ID").exists();
    req.checkBody("CONTACT").exists();
    req.checkBody("IMAGEPATH").exists();
    logindata = {
      NAME: req.body.NAME,
      EMAIL_ID: req.body.EMAIL_ID,
      MOBILENO: req.body.CONTACT,
      PASSWORD: bcrypt.hashSync(req.body.PASSWORD, 10),
      IMAGEURL: req.body.IMAGEPATH,
    };
    SERVICE.create(logindata, function (err, data) {
      if (err) {
        response = {
          success: false,
          message: err,
        };
        res.status(500).send(response);
      }
      response = {
        success: true,
        data: data,
      };
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Error...." });
  }
};

exports.login = (req, res) => {
  try {
    SERVICE.login({ EMAIL: req.body.EMAIL }, function (err, data) {
      if (err) {
        response = {
          success: false,
          message: "Invalid Email...",
        };
        res.status(500).send(response);
      }
      VERIFY.decodepassword(req.body.PASSWORD, data, (err, data) => {
        if (err) {
          response = {
            data: false,
          };

          res.status(500).send(response);
        } else {
          response = {
            data: data
          };
          res.status(200).send(response);
        }
      });
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Error...." });
  }
};
exports.getAllUser = (req, res) => {
  let page = req.body;
  SERVICE.getAlluser(page, function (err, data) {
    if (err) {
      res.status(404).send({
        message: err.message || "Soame Error Occurred While Creating",
      });
    }
    res.send(data);
  });
};
