const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    productos: [{
        _id: false,
        producto: String,
        cantidad: Number
    }]
})
cartSchema.plugin(mongoosePaginate)

module.exports = mongoose.model(cartsCollection, cartSchema)