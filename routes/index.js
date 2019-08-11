var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/product');
const accountCtrl = require('../controllers/account');
/* GET home page. */

router.get('/login', accountCtrl.renderLoginPage);
router.get('/register', accountCtrl.renderRegisterPage);
router.post('/register', accountCtrl.registerAccount);

// router.get('/phone', productCtrl.getProductByType);
router.get('/phone/:id', productCtrl.getProductById);

router.get('/phone', productCtrl.getPhones);

router.get('/', productCtrl.getAllProduct);


module.exports = router;
