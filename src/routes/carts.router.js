const express = require("express");
const CartManager = require("../dao/CartManagerDB.js");

const cartManager = new CartManager();

const router = express.Router();

router.post("/", async (req, res) => {
  res.send(await cartManager.addCarrito(req.body.productos));
});

router.get("/:id", async (req, res) => {
  res.send(await cartManager.getCarritoById(req.params.id));
});

router.post("/:cid/product/:pid", async (req, res) => {
  res.send(await cartManager.updateCarrito(req.params.cid, req.params.pid));
});

module.exports = router;
