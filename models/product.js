const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title : {type: String, require: true},
    category: {type: String, require: true},
    // dong goi: string
    // khuyen mai: string
    // danh sach hinh anh
    // mô tả ngắn
    specification: {type: JSON, require: true},
    description : {type: String, require: true},
    imageUrl : {type: String, require: true},
    price : {type: Number, require: true},
    quantity: { type: Number, require: true},
    status: {type: Boolean, require: true}
});

module.exports = mongoose.model('Product', productSchema);