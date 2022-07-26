const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({

name:{
       type:String,
       minlength:3,
       maxlength:15,
       required:true,
   },

password:{
       type:String,
       required:true
   }
})


// orders:[{
//     type:mongoose.SchemaTypes.ObjectId,
//     ref:'Orders',
//     required:true
// }]
// products:[{
//     type:mongoose.SchemaTypes.ObjectId,
//     ref:'ProductSchema',
//     required:true
    
// }]
// userSchema.pre('save',function(){

//     var salt = bcrypt.genSaltSync(10);
//     this.password = bcrypt.hashSync(this.password, salt);
// })


var userModel= mongoose.model('User',userSchema);

module.exports=userModel

// userModel.create({name:"yara",password:"123"})








