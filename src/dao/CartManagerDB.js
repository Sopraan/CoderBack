const cartModel = require("../models/cart.model.js");

class CartManager {
  constructor() {}

  getCarritos = async (limit) => {
    return await cartModel.find().limit(limit).exec();
  };

  getCarritoById = async (id) => {
    const foundCart = await cartModel.findOne({ _id: id });
    if (!foundCart) {
      console.error("Carrito no encontrado");
    }

    return foundCart;
  };

  addCarrito = async (productos) => {
    return await cartModel.create({ productos: productos });
  };

  updateCarrito = async (idCarrito, idProducto) => {
    console.log(idCarrito, idProducto)
    let carritoAModificar = await cartModel.findOne({ _id: idCarrito });

    if (!carritoAModificar) {
      return console.log("el carrito no existe");
    }

    console.log(carritoAModificar);

    let indexProductoAModificar = carritoAModificar.productos.findIndex(
      (item) => item.producto === idProducto
    );

    if (indexProductoAModificar >= 0) {
      const productoAModificar =
        carritoAModificar.productos[indexProductoAModificar];

      carritoAModificar.productos[indexProductoAModificar] = {
        producto: idProducto,
        cantidad: productoAModificar.cantidad + 1,
      };
    } else {
      carritoAModificar.productos.push({
        producto: idProducto,
        cantidad: 1,
      });
    }

    return await cartModel.findOneAndUpdate(
      { _id: idCarrito },
      { productos: carritoAModificar.productos },
      { new: true }
    );
  };
}

module.exports = CartManager;