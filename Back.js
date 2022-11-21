class ProductManager {

    constructor() {
        this.productos = []
    }

    getProduct = () => this.productos

    getProductById = (id) => {
        const productoEncontrado = this.productos.find(producto => producto.id === id)
        return productoEncontrado || console.error('Producto no encontrado')
    }

    getNextID = () => {
        const cantidad = this.productos.length

      return cantidad + 1
    }


    getNueviId =() =>{

        const productos = this.productos.length

       
         return productos.id +1


    }



    // Validacion de existencia de producto
    checkFields = (producto) => {

        const campoVacio = []

        const codigoRepetido = this.productos.some(prod => prod.codigo === producto.codigo)


        if(codigoRepetido) {
            console.error(`El código ${producto.codigo} ya se encuentra en uso, por favor ingrese otro codigo`)
            return false
        }

        // Validacion de valores y guardado
        const productoValores = Object.entries(producto)
        productoValores.forEach(value => {
            if(!value[1]) campoVacio.push(value[0])
        })

        
        if(campoVacio.length !== 0) { 
            console.error("Debe completar todos los campos. Campos vacíos: ", campoVacio)
            return false
        } 
        return true
    }

    addProducto = (titulo, descripcion, precio, thumbnail, codigo, stock) => {

        const id = this.getNextID()

        const producto = {
            id,
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            precio,
            thumbnail: thumbnail.trim(),
            codigo: codigo.trim(),
            stock
        }

        if(this.checkFields(producto)) {
            this.productos.push(producto)
        }
    }
}



const productManager = new ProductManager()

console.log(productManager.getProduct())

productManager.addProducto("mouse", "logitech", 1000, "Sin imagen", "123", 25)

console.log(productManager.getProduct())
console.log("SEPARADOR DE PRUEBA")


productManager.addProducto("teclado", "razer", 2000, "Sin imagen", "123", 22)
productManager.addProducto("      ", "", 0, "", "", )

console.log(productManager.getProduct())
console.log("SEPARADOR DE PRUEBA")

productManager.addProducto("monitor", "asus", 3000, "Sin imagen", "111", 31)
productManager.addProducto("pad  ", "   hyperx", 4000, "  Sin imagen", " 112", 27)


console.log(productManager.getProduct())
console.log(productManager.getProductById(2))
console.log(productManager.getProductById(20))