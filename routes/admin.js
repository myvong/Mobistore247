var express = require('express');
var router = express.Router();
const adminCtrl = require('../controllers/admin');
/* GET home page. */
router.get('/', adminCtrl.getAllProduct);

module.exports = router;
