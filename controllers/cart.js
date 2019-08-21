const Cart = require('../models/cart');

exports.checkout = async (req, res, next) => {
  await Cart.create(req.body)
    .then((result) => {
      res.status(201).send("Cart added");
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send("Cannot add your cart");
    });
}

exports.renderCart = async (req, res, next) => {
  res.render('checkout');
}

exports.removeItems = async (req, res, next) => {

}