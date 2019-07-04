const Product = require('../models/product');

exports.getAllProduct = async (req, res, next) => {
    var phoneRows = []
    await Product.find({
        category: "phone"
    }).then((products) => {
        for (var i = 0; i < products.length; i += 4) {
            phoneRows.push(products.slice(i, i + 4));
        }
    }
    ).catch(
        (error) => {
            res.render('error');
        }
    );
    var laptopRows = []
    await Product.find({
        category: "laptop"
    }).then((products) => {
        for (var i = 0; i < products.length; i += 4) {
            laptopRows.push(products.slice(i, i + 4));
        }
    }
    ).catch(
        (error) => {
            res.render('error');
        }
    );
    res.render('index', {phones: phoneRows, laptops: laptopRows});

}

exports.getProductById = async (req, res, next) => {
    var phoneRows = []
    await Product.find({
        _id: req.params.id
    }).then((product) => {
        // for (var i = 0; i < products.length; i += 4) {
        //     phoneRows.push(products.slice(i, i + 4));
        // }
        console.log(product);
    }
    ).catch(
        (error) => {
            res.render('error');
        }
    );
    console.log(req.params.id);
    res.render('productDetail', {product: database});
}