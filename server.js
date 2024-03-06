const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

const productRoutes = require('./routes/product');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', homeRoute);
app.use('/products', productRoutes); 
app.use('/carts', cartRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(process.env.PORT || 6400, () => console.log('Server running')))
    .catch(err => console.error(err));
