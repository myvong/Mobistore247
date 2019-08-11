const Product = require('../models/product');
const Comment = require('../models/comment');

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
        status: true
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
        sort: 'createdAt'
    }).populate("user_id").then((comments) => comments);
    res.render('productDetail', {
        product: product,
        comments: [{
            username: 'vkmy',
            comment: 'Sản phẩm này là gì?',
            time: '1 ngày trước'
        }, {
            username: 'tqminh',
            comment: 'Sản phẩm tốt',
            time: '1 tháng trước'
        }]
        // comments: comments
    });
}

exports.getPhones = async (req, res, next) => {

}