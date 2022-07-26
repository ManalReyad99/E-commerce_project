const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SellerSchema = mongoose.Schema({
    role: {
        type: String,
        require: true
    },
    sellerName: {
        type: String,
        trim: true,
        required: true,
        minLength: 8,
        unique: true,
    },
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        minlength: 10,
        required: true,
        trim: true,
    },
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
},
    {
        timestamps: true
    });