const Product = require('../models/product');
const Comment = require('../models/comment');
const moment = require('moment');
const tz = require('moment-timezone');

exports.getAllProduct = async (req, res, next) => {
    var phoneRows = []
    await Product.find({
        category: "phone"
    }).then((products) => {
        for (var i = 0; i < products.length; i += 4) {
            phoneRows.push(products.slice(i, i + 4));
        }
    }).catch((error) => {
        res.render('error', error);
    });
    var laptopRows = []
    await Product.find({
        category: "laptop"
    }).then((products) => {
        for (var i = 0; i < products.length; i += 4) {
            laptopRows.push(products.slice(i, i + 4));
        }
    }).catch((error) => {
        res.render('error', error);
    });
    res.render('index', {phones: phoneRows, laptops: laptopRows});
}

exports.getProductById = async (req, res, next) => {
    const product = await Product.findOne({
        _id: req.params.id,
        category: req.params.type,
        status: true //find only available product 
    }).then((product) => product)
    .catch((error) => {
        console.log(error);
        return null;
    });
    if (!product) {
        res.render('error', {
            status: 404,
            message: 'Product not found'
        });
        return;
    }

    const comments = await Comment.find({
        product_id: product._id,
        status: true
    },
    null, {
        sort: { 'createdAt': -1 },
    }).then((comments) => comments);
    res.render('productDetail', { //in views
        product: product,
        comments: comments
    });
}

exports.getProducstByType = async (req, res, next) => {
    const title = {
        'phone': 'điện thoại',
        'laptop': 'laptop',
        'tablet': 'máy tính bảng',
        'camera': 'máy ảnh',
        'accessories': 'phụ kiện',
    }
    const type = req.params.type;
    var productRows = []
    let message = "";
    await Product.find({
        category: type
    }).then((products) => {
        message = "Có " + products.length + " " + title[type];
        for (var i = 0; i < products.length; i += 4) {
            productRows.push(products.slice(i, i + 4));
        }
    }).catch((error) => {
        res.render('error', error);
    });
    // sử dụng template 'productList' dể render ra browser
    res.render('productList', { products: productRows, message: message });
}

exports.searchProducts = async (req, res, next) => {
    let message = "";
    let productRows = [];
    await Product.find({
        title: new RegExp(req.query.keyword, "i") //find all products containing keyword
    }).then((products) => {
        if (products.length == 0) {
            message = 'Rất tiếc chúng tôi không tìm thấy sản phẩm nào với từ khóa \"' + req.query.keyword + '\"';
            return;
        }
        message = "Tìm thấy " + products.length + " kết quả";
        for (var i = 0; i < products.length; i += 4) {
            productRows.push(products.slice(i, i + 4));
        }
    })
    res.render('productList', { products: productRows, message: message });
}