const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyerController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/search", verifyToken, buyerController.searchProducts);
router.post("/cart/add", verifyToken, buyerController.addToCart);
router.post("/cart/remove", verifyToken, buyerController.removeFromCart);

module.exports = router;
