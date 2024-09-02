const pool = require("../Config/db");

exports.addProduct = async (req, res) => {
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.userId;

  try {
    const result = await pool.query(
      "INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, category, description, price, discount, sellerId]
    );

    res.status(201).json({
      message: "Product added successfully!",
      product: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, discount } = req.body;
  const sellerId = req.user.userId;

  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 AND seller_id = $7 RETURNING *",
      [name, category, description, price, discount, id, sellerId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized action" });
    }

    res.json({
      message: "Product updated successfully!",
      product: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.userId;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 AND seller_id = $2 RETURNING *",
      [id, sellerId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Product not found or unauthorized action" });
    }

    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
