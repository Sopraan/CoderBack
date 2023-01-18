const productModel = require("../models/product.model.js")

class ProductManager {
  constructor() {}

  getProduct = async (query, options) => {
    return await productModel.paginate(query, options)
  };

  getProductById = async (id) => {
    const foundProduct = await productModel.findOne({ _id: id });
    if(!foundProduct){
      console.error("Producto no encontrado")
    }

    return foundProduct;
  };

  addProducto = async (
    titulo,
    descripcion,
    estado,
    categoria,
    precio,
    thumbnails,
    codigo,
    stock
  ) => {

    const producto = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado,
      categoria,
      precio,
      thumbnails: thumbnails,
      codigo: codigo.trim(),
      stock,
    };

    return await productModel.create(producto)
  };

  updateProduct = async (id, obj) => {
    return await productModel.findOneAndUpdate({ _id: id }, obj, {new: true})};

  deleteProduct = async (id) => {
    return await productModel.deleteOne({ _id: id })
  };
}

module.exports = ProductManager;