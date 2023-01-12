const mongoose = require('mongoose');

const productsCollection = "products"

const productSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    estado: Boolean,
    categoria: String,
    precio: Number,
    thumbnails: [String],
    stock: Number
})

module.exports = mongoose.model(productsCollection, productSchema)