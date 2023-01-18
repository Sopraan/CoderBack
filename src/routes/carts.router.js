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
  res.send(await cartManager.agregarProductoACarrito(req.params.cid, req.params.pid, 1));
});

router.put("/:id", async (req, res) => {
  res.send(await cartManager.actualizarProductosEnCarrito(req.params.cid, req.body.productos));
});

router.put("/:cid/product/:pid", async (req, res) => {
  res.send(await cartManager.agregarProductoACarrito(req.params.cid, req.params.pid, req.body.cantidad));
});

router.delete("/:cid/product/:pid", async (req, res) => {
  res.send(await cartManager.eliminarProductoDeCarrito(req.params.cid, req.params.pid));
});

router.delete("/:cid", async (req, res) => {
  res.send(await cartManager.vaciarCarrito(req.params.cid));
});

module.exports = router;
