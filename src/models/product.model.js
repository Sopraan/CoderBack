const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model(productsCollection, productSchema)