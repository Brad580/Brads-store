const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Fixed typo here from 'schema' to 'Schema'
const Product = require('./product');
const User = require('./user');

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Adjusted type for MongoDB ObjectId
        ref: 'User', // Ensure this matches the name used in mongoose.model() for User
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId, // Adjusted type for MongoDB ObjectId
                ref: 'Product', // Ensure this matches the name used in mongoose.model() for Product
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
