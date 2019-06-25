const Product = require('../models/product');

exports.getAllProduct = (req, res, next) => {
    Product.find().then((products) => {
        var chunks = [];
        for (var i = 0; i < products.length; i += 4) {
            chunks.push(products.slice(i, i + 4));
        }
        console.log(chunks);
        res.render('index', {products: chunks});
    }
    ).catch(
        (error) => {
            console.log(error);
        }
    );
}