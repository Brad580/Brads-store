const Product = require('../model/product');

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.getProductCategories = async (req, res) => { /* Implementation */ };
module.exports.getProductsInCategory = async (req, res) => { /* Implementation */ };
module.exports.editProduct = async (req, res) => { /* Implementation */ };
module.exports.deleteProduct = async (req, res) => { /* Implementation */ };
