
  const fs = require("fs");
  const ProductModel = require("../models/products");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const res = require("express/lib/response");

  function findProducts() {
    var products = ProductModel.find({});//.populate("sellerName");
    return products;
  }
  function fineOne(name) {
    var product = ProductModel.findOne({ name: name });
    return product;
  }

  function GetProductsBySellerName(sellerName){
    const product=ProductModel.find({sellerName:sellerName});
    return product;
  
  }
  
  function createProduct(product) {
    var product= ProductModel.create(product);
    return product;
  }
  
  function updateProduct(id,name,description,createdAt,sellerName) {
    var newProduct = ProductModel.findOneAndUpdate({ _id: id }, { name:name,description:description,createdAt:createdAt,sellerName:sellerName });
    return newProduct;
  }
  function deleteProduct(name)
  {
     ProductModel.findOneAndRemove({name: name },
      function (err, docs) {
        
        return docs ;
        
        });
  }
  module.exports = {  findProducts, fineOne,GetProductsBySellerName,createProduct, updateProduct, deleteProduct };
  