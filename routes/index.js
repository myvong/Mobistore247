var express = require('express');
var router = express.Router();
const productCtrl = require('../controllers/product');
/* GET home page. */
router.get('/', productCtrl.getAllProduct);

module.exports = router;
