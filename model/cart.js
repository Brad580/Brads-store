const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Product = require('./product');
const User = require('./user');

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId, 
                ref: 'Product', 
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
