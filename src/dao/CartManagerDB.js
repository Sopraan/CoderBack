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

  actualizarProductosEnCarrito = async (idCarrito, productos) => {
    return await cartModel.findOneAndUpdate(
      { _id: idCarrito },
      { productos: productos },
      { new: true }
    );
  };

  agregarProductoACarrito = async (idCarrito, idProducto, nuevaCantidad) => {
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
        cantidad: productoAModificar.cantidad + nuevaCantidad,
      };
    } else {
      carritoAModificar.productos.push({
        producto: idProducto,
        cantidad: nuevaCantidad,
      });
    }

    return await cartModel.findOneAndUpdate(
      { _id: idCarrito },
      { productos: carritoAModificar.productos },
      { new: true }
    );
  };

  vaciarCarrito = async (idCarrito) => {
    return await cartModel.findOneAndUpdate(
      { _id: idCarrito },
      { productos: [] },
      { new: true }
    );
  };

  eliminarProductoDeCarrito = async (idCarrito, idProducto) => {
    console.log(idCarrito, idProducto)
    let carritoAModificar = await cartModel.findOne({ _id: idCarrito });

    if (!carritoAModificar) {
      return console.log("el carrito no existe");
    }

    console.log(carritoAModificar);

    let productosActualizados = carritoAModificar.productos.filter(
      (item) => item.producto !== idProducto
    );

    return await cartModel.findOneAndUpdate(
      { _id: idCarrito },
      { productos: productosActualizados },
      { new: true }
    );
  };
}

module.exports = CartManager;