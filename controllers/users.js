/*
const fs=require("fs");

function findTodos(){
    var Todos = JSON.parse(fs.readFileSync("./data.json", { encoding: "utf-8" }));
   return Todos
}
function fineOne(id){

    var Todos = JSON.parse(fs.readFileSync("./data.json", { encoding: "utf-8" }));
  
    var todo = Todos.find((user) => user.ID == id);
    return todo;
  }


  module.exports ={findTodos, fineOne}
  */
  const fs = require("fs");
  const userModel = require("../models/users");
  const todoModel = require("../models/products");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const res = require("express/lib/response");
  
  function findUsers() {
    var users = userModel.find({},{fname:1,_id:0});
    return users;
  }
  function fineOne(name) {
    var user = userModel.findOne({ fname: name });
    return user;
  }
  
  function createUser({ fname,lname, password }) {
    var user = userModel.create({fname, lname,password });
    return user;
  }
  
  function updateUser(name, fname,lname) {
    var newUser = userModel.findOneAndUpdate({ fname: name }, { fname: fname,lname:lname });
    return newUser;
  }
  function deleteUser(fname)
  {
     userModel.findOneAndRemove({fname: fname },
      function (err, docs) {
        
        return docs ;
        
        });
  }

  function FindUserTodos(id)
  {
    var todos = todoModel.find({userId:id});
    return todos;
  }
  
  async function login({ fname, password }) {
    var user = await userModel.findOne({ fname: fname });
  
    if (user) {
      var valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return jwt.sign(
          {
            fname: user.fname,
            id: user._id,
          },
          "w6ef77fe7eew6f7ew67",
          { expiresIn: "1h" }
        );
      } else {
        res.status(401).end();
      }
    } else {
      res.status(422).end();
    }
  }
  
  module.exports = { findUsers, fineOne, createUser, updateUser, login,deleteUser ,FindUserTodos};
  