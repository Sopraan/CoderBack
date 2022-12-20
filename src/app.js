const CartRouter = require("./routes/carts.router");
const ProductsRouter = require("./routes/products.router");
const viewsRouter = require("./routes/views.routrer");
const express = require("express");
const { Server} = require("socket.io");
const handlebars = require("express-handlebars");
const { ProductManager } = require("./Manager");

const productManager =new ProductManager();
const app = express();
const httpServer = app.listen(8080, () => console.log("servidor 8080 ON"));
const io = new Server(httpServer);

app.use(express.json());
app.use("/api/carts", CartRouter);
app.use("/api/products", ProductsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log("aadaddddddd");
  socket.on("dame-productos", async () => {
    io.emit("productos", { productos: await productManager.getProduct() });
  });
});
