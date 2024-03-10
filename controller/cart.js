const Cart = require('../model/cart');
const mongoose = require('mongoose');

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

exports.getCartsbyUserid = async (req, res) => {
    try {
        const carts = await Cart.find({ userId: mongoose.Types.ObjectId(req.params.userid) });
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addOrUpdateCart = async (req, res) => {
    const { userId, products } = req.body; 

    try {
        let cart = await Cart.findOne({ userId: mongoose.Types.ObjectId(userId) });

        if (!cart) {
            
            cart = new Cart({
                userId: mongoose.Types.ObjectId(userId),
                products: [],
            });
        }

        products.forEach(({ productId, quantity }) => {
            const productIndex = cart.products.findIndex(product => product.productId === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        });

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: "Error updating cart" });
    }
};

exports.editCart = async (req, res) => {
    const { id } = req.params;
    const { products } = req.body; 

    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, { products }, { new: true });

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(updatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(204).send(); 
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ message: error.message });
    }
};


exports.addOrUpdateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: mongoose.Types.ObjectId(userId) });

        const itemIndex = cart.products.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: "Error updating cart" });
    }
};
