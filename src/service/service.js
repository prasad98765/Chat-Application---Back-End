const MODULE = require("../model/model");

exports.create = (data, callback) => {
  MODULE.create(data, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};

exports.login = (data, callback) => {
  MODULE.login(data, function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};
exports.getAlluser = (page, callback) => {
  MODULE.getAlluser(page, function(err, data) {
    if (err) {
      callback(err);
    }
    callback(null, data);
  });
};

