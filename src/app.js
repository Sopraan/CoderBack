const CartRouter = require("./routes/carts.router");
const ProductsRouter = require("./routes/products.router");
const viewsRouter = require("./routes/views.routrer");
const express = require("express");
const { Server} = require("socket.io");
const handlebars = require("express-handlebars");
const ProductManager = require("./dao/ProductManagerDB");
const MessageManager = require("./dao/MessageManagerDB");

const productManager = new ProductManager();
const messageManager = new MessageManager();

const app = express();
const httpServer = app.listen(8080, () => console.log("servidor 8080 ON"));
const io = new Server(httpServer);
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://coderhouse:Tomako.12@cluster0.pkf3ck1.mongodb.net/?retryWrites=true&w=majority", (error) => {
  if(error){
    console.log("ERROR: could not connect to coderhouse mongodb" + error)
    process.exit()
  } else {
    console.log("mongodb connected successfully")
  }
})

app.use(express.json());
app.use("/api/carts", CartRouter);
app.use("/api/products", ProductsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log("aadaddddddd");
  socket.on("dame-productos", async () => {
    io.emit("productos", { productos: await productManager.getProduct() });

  });
  
  socket.on("get-message-history", async () => {
    io.emit("message-history", { messages: await messageManager.getMessages() });
  });

  
  socket.on("message", async ({user, message}) => {
    messageManager.addMessage(user, message);
    io.emit("message-history", { messages: await messageManager.getMessages() });
  });
  
});



