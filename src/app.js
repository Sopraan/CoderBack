
import cartRouter from './router/users.router.js';
import productsRouter from './router/products.router.js';
const express = require("express");



const ProductManager = require("./Back");

const app  = express()

const productManager = new ProductManager()

app.get('/products', async (req, res) => {
    res.send(await productManager.getProduct(req.query.limit));
})

app.get('/products/:id', async (req, res) => {
    res.send(await productManager.getProductById(req.params.id));
})

app.use('/api/cart',cartRouter)

app.use('/api/products',productsRouter)




app.listen(8080,()=>console.log("servidor 8080 ON"))