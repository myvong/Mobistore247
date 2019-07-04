const Product = require('../models/product');

exports.getAllProduct = (req, res, next) => {
    res.render('index', {layout: 'admin'});
}