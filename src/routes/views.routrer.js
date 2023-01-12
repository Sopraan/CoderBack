const express = require("express");
const ProductManager = require("../dao/ProductManagerDB");

const productManager = new ProductManager();

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(await productManager.getProduct());
  res.render("home", { productos: await productManager.getProduct() });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", async (req, res) => {
  res.render("chat", {});
});

module.exports = router;
