const fs = require("fs");

class ProductManager {
  constructor() {
    this.productos = [];
  }

  getProduct = async (limit) => {
    return fs.promises
      .readFile("productos.json")
      .then((producto) => {
        if (producto) {
          return JSON.parse(producto).slice(0, limit);
        } else return [];
      })
      .catch((error) => {
        console.log("no existen productos en el archivo");
        return [];
      });
  };

  saveProducto = async (productosNuevos) => {
    const gardadoProducto = JSON.stringify(productosNuevos);
    await fs.promises.writeFile("productos.json", gardadoProducto, (error) =>
      console.log(error)
    );
  };

  getProductById = async (id) => {
    const productos = await this.getProduct();

    const productoEncontrado = productos.find((producto) => producto.id == id);

    return productoEncontrado || console.error("Producto no encontrado");
  };

  getNextID = async () => {
    const productos = await this.getProduct();

    const length = productos.length;

    if (length > 0) {
      const ultimoProducto = productos[length - 1];
      const id = ultimoProducto.id + 1;

      return id;
    } else return 1;
  };

  // Validacion de existencia de producto
  checkFields = async (producto) => {
    const campoVacios = [];
    const productos = await this.getProduct();

    const codigoRepetido = productos.some(
      (prod) => prod.codigo === producto.codigo
    );

    if (codigoRepetido) {
      console.error(
        `El código ${producto.codigo} ya se encuentra en uso, por favor ingrese otro codigo`
      );
      return false;
    }

    // Validacion de valores y guardado
    const productoValores = Object.entries(producto);
    productoValores.forEach((value) => {
      if (value[1] === undefined) campoVacios.push(value[0]);
    });

    if (campoVacios.length !== 0) {
      console.error(
        "Debe completar todos los campos. Campos vacíos: ",
        campoVacios
      );
      return false;
    }
    return true;
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
    const id = await this.getNextID();

    const producto = {
      id,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado,
      categoria,
      precio,
      thumbnails: thumbnails,
      codigo: codigo.trim(),
      stock,
    };

    if (await this.checkFields(producto)) {
      const productos = await this.getProduct();

      productos.push(producto);

      this.saveProducto(productos);
    }

    return producto;
  };

  updateProduct = async (id, obj) => {
    const productos = await this.getProduct();

    let productoAModificar = productos.find((producto) => producto.id === id);

    if (!productoAModificar) return console.log("el producto no existe");

    let productoIndex = productos.findIndex((producto) => producto.id === id);

    productos[productoIndex] = {
      ...productos[productoIndex],
      ...obj,
      id: id,
    };
    this.saveProducto(productos);
  };

  deleteProduct = async (id) => {
    console.log(id);

    const productos = await this.getProduct();

    console.log(productos);

    const validarId = () => productos.some((producto) => producto.id === id);

    console.log(productos.some((producto) => producto.id === id));

    if (!validarId()) return console.log("el producto no existe");

    const actualizacionProductos = productos.filter(
      (producto) => producto.id !== id
    );
    this.saveProducto(actualizacionProductos);
  };

  // fin de CLASS
}

class CartManager {
  constructor() {
    this.carrito = [];
  }

  saveJson = async (carritos) => {
    await fs.promises.writeFile(
      "carritos.json",
      JSON.stringify(carritos),
      (error) => console.log(error)
    );
  };

  getCarritos = async (limit) => {
    return fs.promises
      .readFile("carritos.json")
      .then((carritos) => {
        if (carritos) {
          return JSON.parse(carritos).slice(0, limit);
        } else return [];
      })
      .catch((error) => {
        console.log("no existen carritos en el archivo");
        return [];
      });
  };

  getCarritoById = async (id) => {
    const carritos = await this.getCarritos();

    const carritoEncontrado = carritos.find((carrito) => carrito.id == id);

    return (
      carritoEncontrado.productos || console.error("Carrito no encontrado")
    );
  };

  getNextCarritoID = async () => {
    const carritos = await this.getCarritos();

    const length = carritos.length;

    if (length > 0) {
      const ultimoCarrito = carritos[length - 1];
      const id = ultimoCarrito.id + 1;

      return id;
    } else return 1;
  };

  addCarrito = async (productos) => {
    const id = await this.getNextCarritoID();

    const carrito = {
      id: id,
      productos: productos,
    };

    const carritos = await this.getCarritos();

    carritos.push(carrito);

    this.saveJson(carritos);

    return carrito;
  };

  updateCarrito = async (idCarrito, idProducto) => {
    const carritos = await this.getCarritos();

    let carritoAModificar = carritos.find(
      (carrito) => carrito.id === idCarrito
    );

    if (!carritoAModificar) {
      return console.log("el carrito no existe");
    }

    carritoAModificar.productos.findIndex(
      (producto) => producto.id === idProducto
    );

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

    let carritoIndex = carritos.findIndex(
      (carrito) => carrito.id === idCarrito
    );

    carritos[carritoIndex] = {
      id: idCarrito,
      productos: carritoAModificar.productos,
    };

    this.saveJson(carritos);
  };
}

module.exports = {
  ProductManager,
  CartManager,
};
