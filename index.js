const express = require("express");
const path=require('path');
const fs = require("fs");
var app = express();
const cors=require("cors");
const mongoose=require("mongoose");
const userModel= require("./models/users")
const TodoModel= require("./models/products")
const sellerModel= require("./models/seller")

app.use(cors())
mongoose.connect("mongodb://localhost:27017/E-commerce",()=>{

  console.log("conected to db")

})
//const { path } = require("express/lib/application");
app.use(express.static(path.join(__dirname,'productImage')));
const productsRoutes=require("./routes/products");
const userRoutes=require("./routes/users");
const sellerRoutes=require("./routes/seller");



app.use(express.json()); //middleware
app.use((req, res, next) => {
  console.log(req.body);

  next();
});


app.use("/products",productsRoutes);
app.use("/users",userRoutes);
app.use("/seller",sellerRoutes);

app.listen(3000, () => {
  console.log("app started listening on port 3000");
});
