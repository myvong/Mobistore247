const User = require('../models/user');
var passport = require('passport');

exports.renderLoginPage = (req, res, next) => {
    res.render('login', { sessionFlash: res.locals.sessionFlash });
}

exports.renderRegisterPage = (req, res, next) => {
    var messages = req.flash('error');
    res.render('register', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
}


exports.registerUser = (req, res, next) => {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.txtusername, req.body.txtpassword);
        console.log(user);
        req.session.user = user.dataValues;;
        res.redirect('/');
    } catch (e) {
        res.status(400).send(e)
    }
}