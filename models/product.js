const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title : {type: String, require: true},
    category: {type: String, require: true},
    specification: {type: JSON, require: false},
    description : {type: String, require: false},
    shortDescription : {type: String, require: false},
    imageUrl : {type: String, require: false},
    price : {type: Number, require: false},
    quantity: { type: Number, require: false, default: 0 },
    boxing: {type: String, require: false},
    promotion: {type: Array, require: false},
    status: {type: Boolean, require: true, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);