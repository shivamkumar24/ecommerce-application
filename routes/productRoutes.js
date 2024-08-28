const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/add", verifyToken, productController.addProduct);
router.put("/edit/:id", verifyToken, productController.editProduct);
router.delete("/delete/:id", verifyToken, productController.deleteProduct);

module.exports = router;
