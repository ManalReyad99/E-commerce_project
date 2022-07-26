const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({

  sellerName: {//mustbe unique in seller model
    type:String,
    ref: "Seller",//name of schma must be the same name(Seller)
    required: true,
  },
  name:{
    type:String,
    minlength:3,
    maxlength:50,
    required:true,
    unique:true
},
description:{
  type:String,
  maxlength:100,
  required:true
},
 image:{
  type:String,
  required:true
 },
createdAt:{
  type:Date,
},
});


  const ProductModel= mongoose.model('Product', ProductSchema);

  module.exports=ProductModel
