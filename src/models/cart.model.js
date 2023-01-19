const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartsCollection = "carts"

const cartSchema = new mongoose.Schema({
    productos: {
        type: [
            {
                _id: false,
                producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                cantidad: Number
            }
        ],
        default: []
    }
})
cartSchema.plugin(mongoosePaginate)

module.exports = mongoose.model(cartsCollection, cartSchema)