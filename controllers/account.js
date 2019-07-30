const Account = require('../models/account');

exports.renderLoginPage = (req, res, next) => {
    res.render('login');
}

exports.renderRegisterPage = (req, res, next) => {
    res.render('register');
}

exports.registerAccount = (req, res, next) => {
    Account.findOne({
        $or: [{
            username: req.body.txtusername
        }, {
            email: req.body.txtemail
        }]
    }, function (err, result) {
        if (result) {
            res.status(400).send({
                success: false,
                message: 'username or email has been used'
            });
            return;
        }
        var account = new Account({
            username : req.body.txtusername,
            password : req.body.txtpassword,
            fullname: req.body.txtfullname,
            email: req.body.txtemail,
            address : '',
            phoneNumber: req.body.txtphonenumber,
            role: 'user',
            status: true
        });
        account.save(function (err) {
            if (err) {
                res.status(400).send({
                    success: false,
                    message: err.message
                });
                return;
            }
            res.status(201).send({
                success: true,
                message: 'Registered'
            })
        });
    });
}