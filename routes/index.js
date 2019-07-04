var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/product');
/* GET home page. */

// router.get('/phone', productCtrl.getProductByType);
router.get('/phone/:id', productCtrl.getProductById);

router.get('/', productCtrl.getAllProduct);


module.exports = router;
