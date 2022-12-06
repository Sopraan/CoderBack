const fs = require('fs')

class ProductManager {

    constructor() {
        this.productos = []
    }

    getProduct = async (limit) => {

        return fs.promises.readFile('productos.json')
            .then(producto => {
                if (producto) {
                    return JSON.parse(producto).slice(0, limit);
                } else return []
            })
            .catch(error => {
                console.log('no existen productos en el archivo')
                return []
            })



    }

    saveProducto = async (productosNuevos) => {
        const gardadoProducto = JSON.stringify(productosNuevos)
        await fs.promises.writeFile('productos.json', gardadoProducto, error => console.log(error))

    }

    getProductById = async (id) => {

        const productos = await this.getProduct()
        
        
        const productoEncontrado = productos.find(producto => producto.id == id)
        
        return productoEncontrado || console.error('Producto no encontrado')
    }

    getNextID = async () => {

        const productos = await this.getProduct()

        const length = productos.length

        if (length > 0) {
            const ultimoProducto = productos[length - 1]
            const id = ultimoProducto.id + 1

            return id
        } else return 1
    }


    // Validacion de existencia de producto
    checkFields = async (producto) => {

        const campoVacio = []
        const productos = await this.getProduct()

        const codigoRepetido = productos.some(prod => prod.codigo === producto.codigo)


        if (codigoRepetido) {
            console.error(`El código ${producto.codigo} ya se encuentra en uso, por favor ingrese otro codigo`)
            return false
        }

        // Validacion de valores y guardado
        const productoValores = Object.entries(producto)
        productoValores.forEach(value => {
            if (!value[1]) campoVacio.push(value[0])
        })


        if (campoVacio.length !== 0) {
            console.error("Debe completar todos los campos. Campos vacíos: ", campoVacio)
            return false
        }
        return true
    }

    addProducto = async (titulo, descripcion, precio, thumbnail, codigo, stock) => {

        const id = await this.getNextID()

        const producto = {
            id,
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            precio,
            thumbnail: thumbnail.trim(),
            codigo: codigo.trim(),
            stock
        }


        if (await this.checkFields(producto)) {

            const productos = await this.getProduct()

            productos.push(producto)

            this.saveProducto(productos)


        }
    }

    updateProduct = async (id, obj) => {

        const productos = await this.getProduct()

        let productoAModificar = productos.find(producto => producto.id === id)

        if (!productoAModificar)

            return console.log("el producto no existe")

        let productoIndex = productos.findIndex(producto => producto.id === id)

        productos[productoIndex] = {

            ...productos[productoIndex],
            ...obj,
            id: id
        }
        this.saveProducto(productos)
    }







    deleteProduct = async (id) => {

        const productos = await this.getProduct()

        const validarId = () => productos.some(producto => producto.id === id)

        if (!validarId())

            return console.log("el producto no existe")

        const actualizacionProductos = productos.filter(producto => producto.id !== id)
        this.saveProducto(actualizacionProductos)

    }


    // fin de CLASS
}




module.exports = ProductManager