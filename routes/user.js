var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
const userCtrl = require('../controllers/user');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET users listing. */
router.get('/login', notLoggedIn, userCtrl.renderLoginPage);
router.post('/login', notLoggedIn, userCtrl.loginUser);

router.get('/register', notLoggedIn, userCtrl.renderRegisterPage);
router.post('/register', notLoggedIn, passport.authenticate('local.signup', {
    failureRedirect: '/register',
    failureFlash: true
  }), userCtrl.registerUser);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}