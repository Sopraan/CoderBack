const express = require("express");
const { ProductManager } = require("../Manager");

const productManager = new ProductManager();

const router = express.Router();

router.get("/", async (req, res) => {
  res.render('home',{productos: await productManager.getProduct()})
});

router.get("/realtimeproducts", async (req, res) => {
    res.render('realTimeProducts',{})
  });

module.exports = router;
