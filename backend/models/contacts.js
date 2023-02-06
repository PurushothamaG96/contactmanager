const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {type: String}, 
    designation: String,
    company: String,
    industry:String,
    email:String,
    phonenumber:Number,
    category:String,
    userID:String
  });
  const contacts= mongoose.model("contacts", contactSchema, "contacts");

  module.exports= contacts