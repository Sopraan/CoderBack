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




app.listen(8080,()=>console.log("servidor 8080 ON"))