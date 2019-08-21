var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return done(new Error('user not found'));
    }
    done(null, user);
  }
  catch (e) {
    done(e);
  }
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'txtusername',
  passwordField: 'txtpassword',
  passReqToCallback: true
}, async (req, username, password, done) => {
  req.checkBody('txtemail', 'Email không hơp lệ').notEmpty().isEmail();
  req.checkBody('txtpassword', 'Mật khẩu không trùng khớp').notEmpty().equals(req.body.txtpasswordconfirm);
  req.checkBody('txtphonenumber', 'Số điện thoại không hợp lệ').isMobilePhone();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  try {
    let user = await User.findOne({ 'username': username });
    if (user) {
      return done(null, false, { message: 'Tên đăng nhập đã tồn tại' });
    }
    
    var newUser = new User({
      username: req.body.txtusername,
      password: req.body.txtpassword,
      fullname: req.body.txtfullname,
      email: req.body.txtemail,
      phoneNumber: req.body.txtphonenumber
    });
    try {
      await newUser.save();
      return done(null, newUser);
    } catch (e) {
      return done(err);
    }
  }
  catch (e) {
    done(e);
  }
}));


passport.use('local.signin', new LocalStrategy({
  usernameField: 'txtusername',
  passwordField: 'txtpassword',
  passReqToCallback: true
}, async (req, email, password, done) => {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({ 'email': email }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'No user found.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Wrong password.' });
    }
    return done(null, user);
  })
}));