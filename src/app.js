
const CartRouter = require("./routes/carts.router");
const ProductsRouter = require("./routes/products.router");
const express = require("express");

const app  = express()

app.use(express.json());

app.use('/api/carts', CartRouter)

app.use('/api/products', ProductsRouter)




app.listen(8080,()=>console.log("servidor 8080 ON"))