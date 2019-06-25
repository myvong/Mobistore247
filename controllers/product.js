const Product = require('../models/product');

exports.getAllProduct = (req, res, next) => {
    Product.find().then((products) => {
        res.render('index', {products: products});
    }
    ).catch(
        (error) => {
            console.log(error);
        }
    );
}