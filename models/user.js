const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema({
    username : {
        type: String,
        trim: true,
        require: true
    },
    password : {
        type: String,
        trim: true,
        require: true
    },
    fullname: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        require: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone number is invalid')
            }
        },
        require: true
    },
    role: {
        type: String,
        trim: true,
        require: true,
        default: 'user'
    },
    status: {
        type: Boolean,
        trim: true,
        require: true,
        default: true
    }
}, {
    timestamps: true
});

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;