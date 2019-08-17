var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/product');
const accountCtrl = require('../controllers/account');
const commentCtrl = require('../controllers/comment');
/* GET home page. */


router.get('/login', accountCtrl.renderLoginPage);
router.get('/register', accountCtrl.renderRegisterPage);
router.post('/register', accountCtrl.registerAccount);

router.post('/comment', commentCtrl.postComment);
router.get('/comment', commentCtrl.getComments);

router.get('/search', productCtrl.searchProducts);

router.get('/:type', productCtrl.getProducstByType);
router.get('/:type/:id', productCtrl.getProductById);

router.get('/', productCtrl.getAllProduct);


module.exports = router;
