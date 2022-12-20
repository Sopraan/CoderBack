const express = require("express");
const { ProductManager } = require("../Manager");

const productManager = new ProductManager();

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await productManager.getProduct(req.query.limit));
});




router.post("/", async (req, res) => {
  const data = req.body;
  res.send(
    await productManager.addProducto(
      data.titulo,
      data.descripcion,
      data.estado,
      data.categoria,
      data.precio,
      data.thumbnails,
      data.codigo,
      data.stock
    )
  );
});

router.put("/:id", async (req, res) => {
  res.send(
    await productManager.updateProduct(parseInt(req.params.id), req.body)
  );
});

router.delete("/:id", async (req, res) => {
  res.send(await productManager.deleteProduct(parseInt(req.params.id)));
});

router.get("/:id", async (req, res) => {
  res.send(await productManager.getProductById(parseInt(req.params.id)));
});

module.exports = router;
