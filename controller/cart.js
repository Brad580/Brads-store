const Cart = require('../model/cart');

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({});
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSingleCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.params.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get carts by user ID
exports.getCartsbyUserid = async (req, res) => {
    try {
        const carts = await Cart.find({ userId: req.params.userid });
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCart = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            message: 'Data is undefined',
        });
    }

    try {
        const cart = await Cart.create({
            userId: req.body.userId,
            date: new Date(req.body.date),
            products: req.body.products,
        });
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.editCart = async (req, res) => {
    if (!req.body || !req.params.id) {
        return res.status(400).json({
            status: 'error',
            message: 'Something went wrong! Check your sent data',
        });
    }

    try {
        const cart = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    userId: req.body.userId,
                    date: new Date(req.body.date),
                    products: req.body.products,
                },
            },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: 'error',
            message: 'Cart ID should be provided',
        });
    }

    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id });
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.json({ status: 'success', message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
