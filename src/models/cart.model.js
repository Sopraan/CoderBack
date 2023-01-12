const mongoose = require('mongoose');

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    productos: [{
        _id: false,
        producto: String,
        cantidad: Number
    }]
})

module.exports = mongoose.model(cartsCollection, cartSchema)