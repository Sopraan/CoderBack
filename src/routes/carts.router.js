const express = require("express");
const { CartManager } = require("../Manager");

const cartManager = new CartManager();

const router = express.Router();

router.post("/", async (req, res) => {
  res.send(await cartManager.addCarrito(req.body.productos));
});

router.get("/:id", async (req, res) => {
  res.send(await cartManager.getCarritoById(parseInt(req.params.id)));
});

router.post("/:cid/product/:pid", async (req, res) => {
  res.send(
    await cartManager.updateCarrito(
      parseInt(req.params.cid),
      parseInt(req.params.pid)
    )
  );
});

module.exports = router;
