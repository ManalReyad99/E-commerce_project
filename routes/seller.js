const express = require("express");

const {
    getAllSellers,
    getOneSeller,
    createSeller,
    getSellerProducts,
    updateSeller,
    deleteSeller,
    login
} = require("../controllers/seller");

const router = express.Router();


router.get("", async function (req, res) {
    const allSellers = await getAllSellers();
    res.json(allSellers);
});

router.get("/:id", async function (req, res) {
    const seller = await getOneSeller(req.params.id);
    if (!seller) {
        res.status(404).send("seller not found");
    }
    res.status(200).json(seller);
});

router.post("/", async function (req, res) {
    const { role, sellerName, firstName, lastName, password, email } = req.body;
    try {
        const seller = await createSeller(
            role,
            sellerName,
            firstName,
            lastName,
            password,
            email
        );
        res.status(200).json(seller);
    } catch (ex) {
        res.status(500).json(ex);
    }
});

router.get("/:id/products", async function (req, res) {
    const products = await getSellerProducts(req.params.id);
    if (!products) {
        res.status(404).send("products not found");
    }
    res.status(200).json(products);
});

router.patch("/:id", async function (req, res) {
    const { role, sellerName, firstName, lastName, password, email } = req.body;

    const seller = await updateSeller(
        req.params.id,
        role,
        sellerName,
        firstName,
        lastName,
        password,
        email
    );
    if (!seller) {
        res.status(404).send("seller not found");
    }
    res.statusMessage = "seller updated successfully";
    res.status(201).json(seller);
});

router.delete("/:id", async function (req, res) {
    const sellerId = req.params.id;
    const remove = await deleteSeller(sellerId);
    if (!remove) {
        res.status(404).send("seller was not found").end();
    }
    res.status(200).json(remove);
});

router.post("/login", async (req, res, next) => {
    var token = await login(req.body);
    res.json({ token: token });
});

module.exports = router;
