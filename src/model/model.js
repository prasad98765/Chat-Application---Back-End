const MONGOOSE = require("mongoose");

const USERSCHEMA = MONGOOSE.Schema(
  {
    NAME: { type: String, require: true },
    EMAIL: { type: String, require: true },
    PASSWORD: { type:String, require: true },
    MOBILENO: { type: Number, require: true },
    IMAGEURL: { type: String }
  },
  { timestamps: true }
);
const USER_SCHEMA = MONGOOSE.model("Admin Login", USERSCHEMA);

exports.create = (Data, callback) => {
  const USERDETAILS = new USER_SCHEMA();
  USERDETAILS.NAME = Data.NAME;
  USERDETAILS.EMAIL = Data.EMAIL_ID;
  USERDETAILS.PASSWORD = Data.PASSWORD;
  USERDETAILS.MOBILENO = Data.MOBILENO;
  USERDETAILS.IMAGEURL = Data.IMAGEURL;
  USERDETAILS.save()
    .then(data => {
      console.log("in Book Create Service", data);
      callback(null, data);
    })
    .catch(err => {
      callback(
        { message: "Error " },
        null
      );
    });
};
exports.login = (data ,callback) =>{
  USER_SCHEMA.findOne(data)
  .then(data => {
    callback(null, data);
  })
  .catch(err => {
    callback({ message: "plzz Enther Valid Email " });
  });
}
exports.getAlluser = (bookData, callback) => {
  USER_SCHEMA.find({})
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(
        { message: "Error While Storeing Book Deatils in DataBase" },
        null
      );
    });
};


