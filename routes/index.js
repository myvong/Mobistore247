var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/product');
const commentCtrl = require('../controllers/comment');
const cartCtrl = require('../controllers/cart');

router.get('/', productCtrl.getAllProduct);

router.route('/comment')
  .post(commentCtrl.postComment)
  .get(commentCtrl.getComments)

router.get('/search', productCtrl.searchProducts);
router.route('/checkout')
  .get(cartCtrl.renderCart)
  .post(cartCtrl.checkout)


router.get('/:type', productCtrl.getProducstByType);
router.get('/:type/:id', productCtrl.getProductById);


module.exports = router;