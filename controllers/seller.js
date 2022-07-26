const fs = require("fs");
const sellerModel = require("../models/seller");
const productsModel = require("../models/products");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");


async function getAllSellers() {
    var sellers = sellerModel.find({}, { _id: 0, firstName: 1, lastName: 1 });
    return await sellers;
}

async function getOneSeller(id) {
    var seller = sellerModel.findOne({ _id: id });
    return await seller;
}

async function createSeller({ role, sellerName, firstName, lastName, password, email }) {
    var seller = await sellerModel.create({
        role,
        sellerName,
        firstName,
        lastName,
        password,
        email
    })
    seller.save();
    return seller;
}

async function getSellerProducts(id) {
	return await productsModel.find({ sellerId: id });
}

// async function updateSeller(id, seller) {

//     var newseller = await sellerModel.findOneAndUpdate({ _id: id }, seller)
//     return newseller;
async function updateSeller(id, role, sellerName, firstName, lastName, password, email) {
    const newseller = await sellerModel.findById(id);
    if (!newseller) {
        return;
    }
    if (role) {
        newseller.role = role;
    }
    if (sellerName) {
        newseller.sellerName = sellerName;
    }
    if (password) {
        newseller.password = password;
    }
    if (firstName) {
        newseller.firstName = firstName;
    }
    if (lastName) {
        newseller.lastName = lastName;
    }
    if (email) {
        newseller.email = email;
    }

    newseller.save();
    return newseller;
}


async function deleteSeller(id) {
    const seller = await sellerModel.findById(id);
	if (!seller) {
		return;
	}
	const res = await sellerModel.deleteOne({ id });
	return res;
}


async function login({ role, firstName, password }) {
    var role = await sellerModel.findOne({ role: role });
    if(role){
    var seller = await sellerModel.findOne({ firstName: firstName });
    if (seller) {
        var valid = await bcrypt.compare(password, seller.password);
        if (valid) {
            return jwt.sign(
                {
                    role: seller.role,
                    firstName: seller.firstName,
                    id: seller._id,
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
    else {
        res.status(401).end();
    }
}

module.exports = { getAllSellers, getOneSeller, createSeller,getSellerProducts, updateSeller, deleteSeller, login };